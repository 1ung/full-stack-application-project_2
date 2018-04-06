-- create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    admin BOOLEAN,
    img VARCHAR(500)
);

-- create clubs table
CREATE TABLE IF NOT EXISTS clubs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR(255),
    img VARCHAR(500), 
    location VARCHAR(255),
    postal_code INTEGER,
    description TEXT
);

-- create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    club_id INTEGER,
    name VARCHAR(255),
    location VARCHAR(255),
    postal_code INTEGER,
    img VARCHAR(255)
);

-- create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    club_id INTEGER,
    price INTEGER,
    size INTEGER,
    music INTEGER,
    model INTEGER,
    singer INTEGER,
    crowd INTEGER,
    customer_svc INTEGER,
    overall DECIMAL
);

-- create comments table
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    review_id INTEGER,
    user_id INTEGER,
    message TEXT,
    date TIMESTAMP
);

-- create likes table
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    club_id INTEGER,
    user_id INTEGER,
    total INTEGER
);
