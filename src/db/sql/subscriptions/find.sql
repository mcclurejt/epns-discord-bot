SELECT
  *
FROM
  subscriptions
WHERE
  guild = ${ guild }
  AND channel = ${ channel }
  AND msg_sender = ${ msg_sender }
  AND msg_source = ${ msg_source }
  AND msg_type = ${ msg_type };