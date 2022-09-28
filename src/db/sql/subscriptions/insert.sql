INSERT INTO
  subscriptions (
    guild,
    channel,
    msg_sender,
    msg_source,
    msg_type,
    mention,
    created,
    updated
  )
VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8);