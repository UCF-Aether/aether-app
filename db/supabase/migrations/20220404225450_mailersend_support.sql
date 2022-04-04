-- https://github.com/burggraf/supabase-mailer

CREATE OR REPLACE FUNCTION public.send_email_mailersend (message JSONB)
  RETURNS json
  LANGUAGE plpgsql
  SECURITY DEFINER -- required in order to read keys in the private schema
  -- Set a secure search_path: trusted schema(s), then 'pg_temp'.
  -- SET search_path = admin, pg_temp;
  AS $$
DECLARE
  retval json;
  MAILERSEND_API_TOKEN text;
BEGIN
  SELECT value::text INTO MAILERSEND_API_TOKEN FROM private.keys WHERE key = 'MAILERSEND_API_TOKEN';
  IF NOT found THEN RAISE 'missing entry in private.keys: MAILERSEND_API_TOKEN'; END IF;

    SELECT
        * INTO retval
    FROM
        http
        ((
            'POST',
            'https://api.mailersend.com/v1/email',
            ARRAY[http_header ('Authorization',
            'Bearer ' || MAILERSEND_API_TOKEN
            ), http_header ('X-Requested-With', 'XMLHttpRequest')],
            'application/json',
            json_build_object(
                  'from', json_build_object(
                    'email', message->>'sender'
                  ),
                  'to', json_build_array(
                    json_build_object(
                      'email', message->>'recipient'
                    )
                  ),
                  'subject', message->>'subject',
                  'text', message->>'text_body',
                  'html', message->>'html_body' --,
                  --'CustomID', message->>'messageid'
            )::text

        ));
        -- if the message table exists,
        -- and the response from the mail server contains an id
        -- and the message from the mail server starts wtih 'Queued'
        -- mark this message as 'queued' in our message table, otherwise leave it as 'ready'

        IF (SELECT to_regclass('public.messages')) IS NOT NULL AND
            retval::text = '202' THEN
          UPDATE public.messages SET status = 'queued' WHERE id = (message->>'messageid')::UUID;
        ELSE
          RAISE 'error sending message with mailjet: %',retval;
        END IF;

  RETURN retval;
END;
$$;
-- Do not allow this function to be called by public users (or called at all from the client)
REVOKE EXECUTE on function public.send_email_mailersend FROM PUBLIC;

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

CREATE EXTENSION IF NOT EXISTS HTTP;
-- drop function send_email_message;
CREATE OR REPLACE FUNCTION public.send_email_message (message JSONB)
  RETURNS json
  LANGUAGE plpgsql
  SECURITY DEFINER -- required in order to read keys in the private schema
  -- Set a secure search_path: trusted schema(s), then 'pg_temp'.
  -- SET search_path = admin, pg_temp;
  AS $$
DECLARE
  -- variable declaration
  email_provider text := 'mailersend'; -- 'mailgun', 'sendgrid', 'sendinblue', 'mailjet', 'mailersend'
  retval json;
  messageid text;
BEGIN


  IF message->'text_body' IS NULL AND message->'html_body' IS NULL THEN RAISE 'message.text_body or message.html_body is required'; END IF;

  IF message->'text_body' IS NULL THEN
     select message || jsonb_build_object('text_body',message->>'html_body') into message;
  END IF;

  IF message->'html_body' IS NULL THEN
     select message || jsonb_build_object('html_body',message->>'text_body') into message;
  END IF;

  IF message->'recipient' IS NULL THEN RAISE 'message.recipient is required'; END IF;
  IF message->'sender' IS NULL THEN RAISE 'message.sender is required'; END IF;
  IF message->'subject' IS NULL THEN RAISE 'message.subject is required'; END IF;

  IF message->'messageid' IS NULL AND (SELECT to_regclass('public.messages')) IS NOT NULL THEN
    -- messages table exists, so save this message in the messages table
    INSERT INTO public.messages(recipient, sender, cc, bcc, subject, text_body, html_body, status, log)
    VALUES (message->'recipient', message->'sender', message->'cc', message->'bcc', message->'subject', message->'text_body', message->'html_body', 'ready', '[]'::jsonb) RETURNING id INTO messageid;
    select message || jsonb_build_object('messageid',messageid) into message;
  END IF;

  EXECUTE 'SELECT send_email_' || email_provider || '($1)' INTO retval USING message;
  -- SELECT send_email_mailgun(message) INTO retval;
  -- SELECT send_email_sendgrid(message) INTO retval;

  RETURN retval;
END;
$$;
-- Do not allow this function to be called by public users (or called at all from the client)
REVOKE EXECUTE on function public.send_email_message FROM PUBLIC;