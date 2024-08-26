CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  auth_id VARCHAR(50) UNIQUE,
  username VARCHAR(20),
  email VARCHAR(255),
  locale VARCHAR(255),
  gender VARCHAR(255),
  profile TEXT,
  birthday DATE,
  imageicon_data VARCHAR(255)
);