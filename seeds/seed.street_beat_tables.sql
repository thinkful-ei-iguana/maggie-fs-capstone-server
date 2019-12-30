BEGIN;

TRUNCATE
  street_bands,
  street_setlists,
  street_songs,
  street_users
  RESTART IDENTITY CASCADE;
psql -U flyby -d street_beat_test -f ./seeds/seed/thingful_tables.sql

INSERT INTO street_users (first_name, last_name, email, password)
VALUES
  ('Maggie', 'McClellan', 'notdwight@krentist.com', '$2a$12$j6ENCbiom1A.jaYtDFSZ5Oiz63yNeMYfXfeYo7w8UFaTqYENCVUce'),
  ('Matt', 'Bittarelli', 'basstrombone@woohoo.com', '$2a$12$6MzPZhk2p4cRgMiTMNXpE.SvCj46JCAXkgUoqYh2nsHAvWvuK.mAG');


INSERT INTO street_songs (title, artist, duration)
VALUES
  ('Asterix', 'Gallowstreet', 4:30),
  ('Cuzco', 'Broken Brass Ensemble', 5:00);

INSERT INTO street_setlists (title, date, song_id)
VALUES
  ('MFA Gig', '1/15/20', 1);

INSERT INTO street_bands (band_name, city, state, country, description, member_id)
VALUES
  ('Boycott', 'Somerville', 'MA', 'USA', 'All-lady brass band', 1),
  ('Party Band', 'Lowell', 'MA', 'USA', 'Purple', 2);

COMMIT;