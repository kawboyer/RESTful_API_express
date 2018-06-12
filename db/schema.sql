DROP DATABASE IF EXISTS outline_db;

CREATE DATABASE outline_db;

USE outline_db;

CREATE TABLE nodes (
id INT NOT NULL AUTO_INCREMENT,
node_name VARCHAR(200) NOT NULL,
node_range_start INT,
node_range_end INT,
node_children INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY AUTO_INCREMENT (id)
);

CREATE TABLE subitems (
id INT NOT NULL,
subitems_no INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);