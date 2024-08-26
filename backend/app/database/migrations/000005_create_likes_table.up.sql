CREATE TABLE likes (
  like_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT DEFAULT NULL,
  is_like BOOLEAN,
  created_at TIMESTAMP DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(post_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);