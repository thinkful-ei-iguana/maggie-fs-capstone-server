BEGIN;

TRUNCATE
  street_bands,
  street_setlists,
  street_songs,
  street_users,
  street_band_members,
  street_setlist_songs
  RESTART IDENTITY CASCADE;

INSERT INTO street_users (first_name, last_name, email, password)
VALUES
  ('Maggie', 'McClellan', 'notdwight@mailinator.com', '$2a$12$bVHKOz8m0mZt8aevGr1mJuWqQclBJe4IhYhs6xvEtldcRh/2IsHAW'),
  ('Lyra', 'Silvertongue', 'lyra@oxford.org', '$2a$12$y8nG9lz7MsBRITwlg.5J5u5QeUx3bbn4C/ZVcgvaFfCC52mY37cey'),
  ('Matt', 'Bittarelli', 'basstrombone@mailinator.com', '$2a$12$6MzPZhk2p4cRgMiTMNXpE.SvCj46JCAXkgUoqYh2nsHAvWvuK.mAG');

INSERT INTO street_bands (band_name, city, state, country, description)
VALUES
  ('Fly By Brass Band', 'Boston', 'MA', 'USA', 'So fly'),
  ('Boycott', 'Somerville', 'MA', 'USA', 'All-lady brass band'),
  ('Party Band', 'Lowell', 'MA', 'USA', 'Purple'),
  ('Titubanda', 'Roma', null, 'Italy', 'Amore');

INSERT INTO street_songs (title, artist, duration, band_id)
VALUES
  ('Asterix', 'Gallowstreet', '4', 1),
  ('Cuzco', 'Broken Brass Ensemble', '5', 1),
  ('Radio Kabul', 'Express Brass band', '4', 1),
  ('Louise', 'Fiati Sprecati', '3', 1),
  ('3AM Bounce', 'No BS Brass Band', '4', 1),
  ('Strollin', 'Lucas Paquette', '3', 1),
  ('Elbo Rumba', 'Unknown', '5', 1),
  ('The Dirge', 'Mad Caddies', '3', 1),
  ('When You Know', 'Hackney Collier Band', '3', 1),
  ('Straight Up', 'Paula Abdul', '3', 2),
  ('Louise', 'Fiati Sprecati', '5', 2),
  ('War', 'Hypnotic Brass Ensemble', '5', 2),
  ('First Contact', 'Masala Brass Kollectiv', '3', 2),
  ('Odwalla', 'Banda Roncati', '3', 2),
  ('Crazy In Love', 'Beyonce', '4', 2),
  ('Hips Dont Lie', 'Shakira', '4', 2);

INSERT INTO street_setlists (title, date)
VALUES
  ('MFA Gig', '1/15/20'),
  ('Practice', '3/2/2020'),
  ('HONK Fest', '5/2/2019');

INSERT INTO street_band_members (user_id, band_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (2, 4),
  (3, 1),
  (3, 3);


INSERT INTO street_setlist_songs (song_id, song_position, setlist_id, band_id)
VALUES
  (1, 1, 3, 1),
  (4, 0, 3, 1),
  (2, 1, 2, 1),
  (4, 2, 2, 1),
  (5, 0, 2, 1),
  (10, 1, 1, 2),
  (11, 2, 1, 2),
  (16, 3, 1, 2),
  (14, 4, 1, 2),
  (12, 0, 1, 2),
  (15, 1, 2, 2),
  (11, 2, 2, 2),
  (16, 3, 2, 2),
  (10, 4, 2, 2),
  (14, 0, 2, 2);


COMMIT;