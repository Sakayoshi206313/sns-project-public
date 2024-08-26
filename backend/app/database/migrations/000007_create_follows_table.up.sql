CREATE TABLE follows (
  follow_id SERIAL PRIMARY KEY,
  follower_id VARCHAR(50) NOT NULL,
  followee_id VARCHAR(50) NOT NULL,
  FOREIGN KEY (follower_id) REFERENCES users (auth_id),
  FOREIGN KEY (followee_id) REFERENCES users (auth_id)
)