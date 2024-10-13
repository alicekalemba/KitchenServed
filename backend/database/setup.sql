CREATE SCHEMA kitchen_served;

SET search_path TO kitchen_served;

CREATE TABLE meal (
    meal_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT null,
    created_date TIMESTAMP,
    created_by VARCHAR(255),
    updated_date TIMESTAMP,
    updated_by VARCHAR(255)
);

CREATE TABLE recipe (
	recipe_id SERIAL PRIMARY KEY,
    meal_id INT,
    recipe_name VARCHAR(50) NOT NULL,
    ingredients TEXT NOT NULL,
    cooking_time VARCHAR(20),
    created_date TIMESTAMP,
    created_by VARCHAR(255),
    updated_date TIMESTAMP,
    updated_by VARCHAR(255)
);

CREATE TABLE store (
   store_id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   location text,
   created_date TIMESTAMP,
    created_by VARCHAR(255),
    updated_date TIMESTAMP,
    updated_by VARCHAR(255)
);

CREATE TABLE ingredient (
   ingredient_id SERIAL PRIMARY KEY,
   store_id INT,
   name VARCHAR(50) NOT NULL,
   price DECIMAL,
   created_date TIMESTAMP,
    created_by VARCHAR(255),
    updated_date TIMESTAMP,
    updated_by VARCHAR(255)
);
