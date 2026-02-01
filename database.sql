-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    plan ENUM('free', 'pro') DEFAULT 'free' NOT NULL,
    razorpay_sub_id VARCHAR(255) DEFAULT NULL,
    uploads_used INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (email)
);

-- Optional: Seed some initial test data
INSERT INTO users (email, plan, razorpay_sub_id, uploads_used) 
VALUES ('testuser@example.com', 'free', NULL, 0)
ON DUPLICATE KEY UPDATE email=email;