\c project_2

INSERT INTO users
    (name, email, password, admin)
VALUES
    ('test', 'test@123.com', 'abc123', TRUE);
INSERT INTO clubs
    (user_id, name, img, location, postal_code, description)
VALUES
    (1, 'IICON', 'https://scontent.fsin1-1.fna.fbcdn.net/v/t1.0-9/19146210_660081014187582_1409497989286272208_n.jpg?_nc_cat=0&oh=87c729577f783b3b45feed57caad5250&oe=5B29992D', '35, Selegie Road Parklane Shopping Mall #04', 188307, 'Enter description here');
INSERT INTO reviews
    (user_id, club_id, price, size, music, model, singer, crowd, customer_svc, overall)
VALUES
    (1, 1, 3, 3, 3, 4, 3, 2, 4, 3.14285);