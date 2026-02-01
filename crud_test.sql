USE user_management;

-- CREATE
INSERT INTO users (email, plan, razorpay_sub_id, uploads_used) 
VALUES ('newuser@gmail.com', 'free', NULL, 0);

-- READ
SELECT * FROM users;
SELECT * FROM users WHERE email = 'newuser@gmail.com';

-- UPDATE
UPDATE users 
SET plan = 'pro', razorpay_sub_id = 'sub_test_001' 
WHERE email = 'newuser@gmail.com';

-- DELETE=
DELETE FROM users WHERE email = 'newuser@gmail.com';