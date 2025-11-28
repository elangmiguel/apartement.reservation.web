-- Función para generar email
CREATE OR REPLACE FUNCTION management.generate_user_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email := NEW.username || '@' || COALESCE(NEW.domain, 'apartmentz.com');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger en la tabla users antes de insert
CREATE TRIGGER trg_generate_email
BEFORE INSERT ON management.users
FOR EACH ROW
EXECUTE FUNCTION management.generate_user_email();


-- =========================
-- 10 edificios
-- =========================
INSERT INTO management.buildings ("name", address, created_at, updated_at) VALUES
('Edificio 1', '10 Calle Falsa', NOW(), NOW()),
('Edificio 2', '20 Calle Falsa', NOW(), NOW()),
('Edificio 3', '30 Calle Falsa', NOW(), NOW()),
('Edificio 4', '40 Calle Falsa', NOW(), NOW()),
('Edificio 5', '50 Calle Falsa', NOW(), NOW()),
('Edificio 6', '60 Calle Falsa', NOW(), NOW()),
('Edificio 7', '70 Calle Falsa', NOW(), NOW()),
('Edificio 8', '80 Calle Falsa', NOW(), NOW()),
('Edificio 9', '90 Calle Falsa', NOW(), NOW()),
('Edificio 10', '100 Calle Falsa', NOW(), NOW());

-- =========================
-- 10 apartamentos
-- =========================
INSERT INTO management.apartments (capacity, floor, "number", building_id, code, status, created_at, updated_at) VALUES
(2, 1, 101, 1, 'A101', 'AVAILABLE', NOW(), NOW()),
(3, 2, 102, 2, 'A102', 'RESERVED', NOW(), NOW()),
(1, 3, 103, 3, 'A103', 'AVAILABLE', NOW(), NOW()),
(4, 1, 104, 4, 'A104', 'RESERVED', NOW(), NOW()),
(2, 2, 105, 5, 'A105', 'AVAILABLE', NOW(), NOW()),
(5, 3, 106, 6, 'A106', 'RESERVED', NOW(), NOW()),
(3, 1, 107, 7, 'A107', 'AVAILABLE', NOW(), NOW()),
(2, 2, 108, 8, 'A108', 'RESERVED', NOW(), NOW()),
(4, 3, 109, 9, 'A109', 'AVAILABLE', NOW(), NOW()),
(1, 1, 110, 10, 'A110', 'RESERVED', NOW(), NOW());

-- =========================
-- 10 personas
-- =========================
INSERT INTO management.persons (first_name, last_name, birth_date, gender, identity_type, identity_value, created_at, updated_at) VALUES
('Miguel', 'Perez', '1980-05-10', 'MALE', 'passport', 'ID1001', NOW(), NOW()),
('Laura', 'Gomez', '1985-08-20', 'FEMALE', 'id_card', 'ID1002', NOW(), NOW()),
('Carlos', 'Rodriguez', '1990-01-15', 'MALE', 'passport', 'ID1003', NOW(), NOW()),
('Ana', 'Lopez', '1975-03-30', 'FEMALE', 'id_card', 'ID1004', NOW(), NOW()),
('David', 'Martinez', '1982-07-22', 'MALE', 'passport', 'ID1005', NOW(), NOW()),
('Sofia', 'Garcia', '1995-12-05', 'FEMALE', 'id_card', 'ID1006', NOW(), NOW()),
('Luis', 'Sanchez', '1988-09-17', 'MALE', 'passport', 'ID1007', NOW(), NOW()),
('Maria', 'Ramirez', '1992-06-11', 'FEMALE', 'id_card', 'ID1008', NOW(), NOW()),
('Juan', 'Torres', '1978-11-02', 'MALE', 'passport', 'ID1009', NOW(), NOW()),
('Camila', 'Vargas', '1987-02-28', 'FEMALE', 'id_card', 'ID1010', NOW(), NOW());

-- =========================
-- 10 contactos
-- =========================
INSERT INTO management.contacts (person_id, "type", value, is_main, created_at, updated_at) VALUES
(1,'EMAIL','miguel@example.com',true,NOW(),NOW()),
(2,'PHONE','+573000001',true,NOW(),NOW()),
(3,'EMAIL','carlos@example.com',true,NOW(),NOW()),
(4,'PHONE','+573000004',true,NOW(),NOW()),
(5,'EMAIL','david@example.com',true,NOW(),NOW()),
(6,'PHONE','+573000006',true,NOW(),NOW()),
(7,'EMAIL','luis@example.com',true,NOW(),NOW()),
(8,'PHONE','+573000008',true,NOW(),NOW()),
(9,'EMAIL','juan@example.com',true,NOW(),NOW()),
(10,'PHONE','+573000010',true,NOW(),NOW());

-- =========================
-- 10 usuarios
-- =========================
INSERT INTO management.users (username, "domain", email, password_hash, status, created_at, updated_at) VALUES
('miguel','apartmentz.com','miguel@apartmentz.com','$2a$10$hash1','ACTIVE',NOW(),NOW()),
('laura','apartmentz.com','laura@apartmentz.com','$2a$10$hash2','ACTIVE',NOW(),NOW()),
('carlos','apartmentz.com','carlos@apartmentz.com','$2a$10$hash3','ACTIVE',NOW(),NOW()),
('ana','apartmentz.com','ana@apartmentz.com','$2a$10$hash4','ACTIVE',NOW(),NOW()),
('david','apartmentz.com','david@apartmentz.com','$2a$10$hash5','ACTIVE',NOW(),NOW()),
('sofia','apartmentz.com','sofia@apartmentz.com','$2a$10$hash6','ACTIVE',NOW(),NOW()),
('luis','apartmentz.com','luis@apartmentz.com','$2a$10$hash7','ACTIVE',NOW(),NOW()),
('maria','apartmentz.com','maria@apartmentz.com','$2a$10$hash8','ACTIVE',NOW(),NOW()),
('juan','apartmentz.com','juan@apartmentz.com','$2a$10$hash9','ACTIVE',NOW(),NOW()),
('camila','apartmentz.com','camila@apartmentz.com','$2a$10$hash10','ACTIVE',NOW(),NOW());

-- =========================
-- 10 roles
-- =========================
INSERT INTO management.roles ("name", created_at, updated_at) VALUES
('RECEPTION',NOW(),NOW()),
('CLEANING',NOW(),NOW()),
('MANAGER',NOW(),NOW()),
('SECURITY',NOW(),NOW()),
('GUEST',NOW(),NOW()),
('MAINTENANCE',NOW(),NOW()),
('ACCOUNTANT',NOW(),NOW()),
('SUPERVISOR',NOW(),NOW()),
('RESIDENT',NOW(),NOW());

-- =========================
-- 10 user_roles
-- =========================
INSERT INTO management.user_roles (user_id, role_id, created_at, updated_at) VALUES
(2,2,NOW(),NOW()),
(3,3,NOW(),NOW()),
(4,4,NOW(),NOW()),
(5,5,NOW(),NOW()),
(6,6,NOW(),NOW()),
(7,7,NOW(),NOW()),
(8,8,NOW(),NOW()),
(9,9,NOW(),NOW()),
(10,10,NOW(),NOW());

-- =========================
-- 10 reservas
-- =========================
INSERT INTO management.reservations (user_id, apartment_id, start_date, end_date, created_at, updated_at) VALUES
(2,1,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(3,2,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(4,3,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(5,4,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(6,5,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(7,6,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(8,7,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(9,8,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(10,9,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW()),
(11,10,NOW(),NOW()+INTERVAL '3 days',NOW(),NOW());

