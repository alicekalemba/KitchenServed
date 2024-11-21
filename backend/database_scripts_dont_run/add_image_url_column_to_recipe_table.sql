ALTER TABLE kitchen_served.recipe
ADD COLUMN image_url TEXT;

ALTER TABLE kitchen_served.recipe ALTER COLUMN image_url DROP NOT NULL;

