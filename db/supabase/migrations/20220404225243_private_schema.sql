create schema private;

create table private.keys
(
  key text primary key not null,
  value text
);

revoke all on table private.keys from public;
