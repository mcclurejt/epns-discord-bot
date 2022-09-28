CREATE TABLE IF NOT EXISTS subscriptions (
  guild VARCHAR(64) NOT NULL,
  channel VARCHAR(64) NOT NULL,
  msg_sender VARCHAR(64) NOT NULL,
  msg_source VARCHAR(64) NOT NULL,
  msg_type INT NOT NULL,
  mention VARCHAR(64) NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (guild, channel, msg_sender, msg_source, msg_type)
);