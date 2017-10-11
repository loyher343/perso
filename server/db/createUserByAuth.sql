
INSERT INTO users (email, authid, nickname, picture) VALUES ($1, $2, $3, $4) RETURNING user, authid, nickname, picture;

