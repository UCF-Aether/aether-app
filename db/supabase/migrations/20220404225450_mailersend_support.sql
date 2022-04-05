-- https://github.com/burggraf/supabase-mailer

create or replace function public.send_email_mailersend(message jsonb)
  returns json
  language plpgsql
  security definer -- required in order to read keys in the private schema
-- Set a secure search_path: trusted schema(s), then 'pg_temp'.
-- SET search_path = admin, pg_temp;
as
$$
declare
  retval               json;
  mailersend_api_token text;
begin
  select value::text into mailersend_api_token from private.keys where key = 'MAILERSEND_API_TOKEN';
  if not found then raise 'missing entry in private.keys: MAILERSEND_API_TOKEN'; end if;

  select *
  into retval
  from
    http
      ((
        'POST',
        'https://api.mailersend.com/v1/email',
        array [
          http_header('Authorization', 'Bearer ' || mailersend_api_token),
          http_header('X-Requested-With', 'XMLHttpRequest')
          ],
        'application/json',
        json_build_object(
            'from', json_build_object(
            'email', message ->> 'sender'
          ),
            'to', json_build_array(
                json_build_object(
                    'email', message ->> 'recipient'
                  )
              ),
            'subject', message ->> 'subject',
            'text', message ->> 'text_body',
            'html', message ->> 'html_body' --,
        --'CustomID', message->>'messageid'
          )::text
      ));
  -- if the message table exists,
  -- and the response from the mail server contains an id
  -- and the message from the mail server starts wtih 'Queued'
  -- mark this message as 'queued' in our message table, otherwise leave it as 'ready'

  if (select to_regclass('public.messages')) is not null and
     retval::text = '202' then
    update public.messages set status = 'queued' where id = (message ->> 'messageid')::uuid;
  elseif retval::text != '202' then
    raise 'error sending message with mailersend: %', retval;
  end if;

  return retval;
end;
$$;
-- Do not allow this function to be called by public users (or called at all from the client)
revoke execute on function public.send_email_mailersend from public;

/*
curl -X POST \
https://api.mailersend.com/v1/email \
-H 'Content-Type: application/json' \
-H 'X-Requested-With: XMLHttpRequest' \
-H 'Authorization: Bearer {place your token here without brackets}' \
-d '{
    "from": {
        "email": "your@email.com"
    },
    "to": [
        {
            "email": "your@email.com"
        }
    ],
    "subject": "Hello from MailerSend!",
    "text": "Greetings from the team, you got this message through MailerSend.",
    "html": "Greetings from the team, you got this message through MailerSend."
}'
*/

create extension if not exists http;
-- drop function send_email_message;
create or replace function public.send_email_message(message jsonb)
  returns json
  language plpgsql
  security definer -- required in order to read keys in the private schema
-- Set a secure search_path: trusted schema(s), then 'pg_temp'.
-- SET search_path = admin, pg_temp;
as
$$
declare
  -- variable declaration
  email_provider text := 'mailersend'; -- 'mailgun', 'sendgrid', 'sendinblue', 'mailjet', 'mailersend'
  retval         json;
  messageid      text;
begin


  if message -> 'text_body' is null and message -> 'html_body' is null then
    raise 'message.text_body or message.html_body is required';
  end if;

  if message -> 'text_body' is null then
    select message || jsonb_build_object('text_body', message ->> 'html_body') into message;
  end if;

  if message -> 'html_body' is null then
    select message || jsonb_build_object('html_body', message ->> 'text_body') into message;
  end if;

  if message -> 'recipient' is null then raise 'message.recipient is required'; end if;
  if message -> 'sender' is null then raise 'message.sender is required'; end if;
  if message -> 'subject' is null then raise 'message.subject is required'; end if;

  if message -> 'messageid' is null and (select to_regclass('public.messages')) is not null then
    -- messages table exists, so save this message in the messages table
    insert into public.messages(recipient, sender, cc, bcc, subject, text_body, html_body, status, log)
    values (message -> 'recipient', message -> 'sender', message -> 'cc', message -> 'bcc', message -> 'subject',
            message -> 'text_body', message -> 'html_body', 'ready', '[]'::jsonb)
    returning id into messageid;
    select message || jsonb_build_object('messageid', messageid) into message;
  end if;

  execute 'SELECT send_email_' || email_provider || '($1)' into retval using message;
  -- SELECT send_email_mailgun(message) INTO retval;
  -- SELECT send_email_sendgrid(message) INTO retval;

  return retval;
end;
$$;
-- Do not allow this function to be called by public users (or called at all from the client)
revoke execute on function public.send_email_message from public;