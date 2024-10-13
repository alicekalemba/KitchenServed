-- Insert seed data into the meal table with created and updated information
INSERT INTO meal (name, created_date, created_by, updated_date, updated_by) VALUES
('Breakfast', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user'),
('Lunch', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user'),
('Dinner', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user');

-- Insert seed data into the store table with created and updated information
INSERT INTO store (name, location, created_date, created_by, updated_date, updated_by) VALUES
('Vons', 'https://maps.app.goo.gl/hQMLPxbvm48uVFSF9?g_st=com.google.maps.preview.copy', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user'),
('Costco', 'https://maps.app.goo.gl/worGoPpVmiSR7sjK6?g_st=com.google.maps.preview.copy', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user'),
('Hannam', 'https://maps.app.goo.gl/K9ZK3aoTHCCgEvbz9?g_st=com.google.maps.preview.copy', CURRENT_TIMESTAMP, 'admin_user', CURRENT_TIMESTAMP, 'admin_user');

