-- Datos de prueba para la tabla User
INSERT INTO "User" (username, password, email, phone, profile_picture_url) VALUES
                                                                               ('doctor1', 'hashed_password_1', 'doctor1@example.com', '+1234567890', NULL),
                                                                               ('patient1', 'hashed_password_2', 'patient1@example.com', '+0987654321', NULL);

-- Datos de prueba para la tabla Role
INSERT INTO Role (name) VALUES
                            ('Admin'),
                            ('Doctor'),
                            ('Patient');

-- Relación Usuario-Roles
INSERT INTO User_Role (user_id, role_id) VALUES
                                             (1, 2),
                                             (2, 3);

-- Datos de prueba para la tabla Patient
INSERT INTO Patient (name, last_name, birth_date, weight, height, gender, city, state, postal_code, user_id) VALUES
    ('John', 'Doe', '1980-05-15', 75.5, 1.80, 'Male', 'New York', 'NY', '10001', 2);

-- Datos de prueba para la tabla Medical_Practitioner
INSERT INTO Medical_Practitioner (name, last_name, birth_date, user_id) VALUES
    ('Dr. Alice', 'Smith', '1975-09-22', 1);

-- Datos de prueba para la tabla Specialty
INSERT INTO Specialty (name, description) VALUES
                                              ('Cardiology', 'Heart specialist'),
                                              ('Pediatrics', 'Children health');

-- Relación Médico-Especialidad
INSERT INTO Medical_Practitioner_Specialty (medical_practitioner_id, specialty_id) VALUES
    (1, 1);

-- Datos de prueba para la tabla Service
INSERT INTO Service (name, description, price) VALUES
                                                   ('General Consultation', 'Basic health checkup', 50.00),
                                                   ('ECG Test', 'Electrocardiogram test', 150.00);

-- Relación Médico-Servicio
INSERT INTO Medical_Practitioner_Service (medical_practitioner_id, service_id) VALUES
                                                                                   (1, 1),
                                                                                   (1, 2);

-- Datos de prueba para la tabla Status
INSERT INTO Status (name) VALUES
                              ('Scheduled'),
                              ('Completed');

-- Datos de prueba para la tabla Appointment
INSERT INTO Appointment (start_time, end_time, reason, status_id, patient_id, medical_practitioner_id, service_id) VALUES
    ('2025-03-01 10:00:00', '2025-03-01 10:30:00', 'Routine checkup', 1, 1, 1, 1);

-- Datos de prueba para la tabla Payment_Method
INSERT INTO Payment_Method (name) VALUES
                                      ('Credit Card'),
                                      ('PayPal');

-- Datos de prueba para la tabla Payment
INSERT INTO Payment (stripe_payment_id, amount, currency, payment_method_id, patient_id, invoice_id) VALUES
    ('txn_12345', 50.00, 'USD', 1, 1, 1);

-- Datos de prueba para la tabla Invoice
INSERT INTO Invoice (total_amount, issue_date, due_date, patient_id, status_id) VALUES
    (50.00, '2025-03-01', NULL, 1, 1);

-- Datos de prueba para la tabla Invoice_Details
INSERT INTO Invoice_Details (invoice_id, service_id, quantity, subtotal) VALUES
    (1, 1, 1, 50.00);

-- Datos de prueba para la tabla Insurance
INSERT INTO Insurance (name) VALUES
    ('Medicare');

-- Relación Paciente-Seguros
INSERT INTO Patient_Insurance (patient_id, insurance_id) VALUES
    (1, 1);

-- Datos de prueba para la tabla Identification_Type
INSERT INTO Identification_Type (type) VALUES
                                           ('DNI'),
                                           ('Passport');

-- Datos de prueba para la tabla Identification_User
INSERT INTO Identification_User (number, identification_document_url, identification_type_id) VALUES
    ('ABC123456', NULL, 1);

-- Relación Identificación-Paciente
INSERT INTO Patient_Identification (patient_id, identification_id) VALUES
    (1, 1);

-- Datos de prueba para la tabla Consent
INSERT INTO Consent (type, description) VALUES
    ('General Consent', 'Agreement for medical procedures');

-- Datos de prueba para la tabla Obstetricians
INSERT INTO Obstetricians (patient_id, pregnancies, births, cesarean_sections, misbirths, last_date_of_menstruation, contraceptive_methods) VALUES
    (1, 2, 1, 1, 0, '2025-02-15', 'Pill');

-- Datos de prueba para la tabla Feedback
INSERT INTO Feedback (rating, comments, patient_id, service_id, medical_practitioner_id) VALUES
    (5, 'Great service!', 1, 1, 1);

-- Datos de prueba para la tabla Audit_Log
INSERT INTO Audit_Log (user_id, action, table_name, record_id, changes) VALUES
    (1, 'INSERT', 'Patient', 1, '{"name": "John", "last_name": "Doe"}');

-- Datos de prueba para la tabla Prescription
INSERT INTO Prescription (patient_id, medical_practitioner_id, notes) VALUES
    (1, 1, 'Take one tablet daily');

-- Datos de prueba para la tabla Prescription_Medication
INSERT INTO Prescription_Medication (prescription_id, medication_name, dosage, instructions) VALUES
    (1, 'Aspirin', '100mg', 'Take after meals');

-- Datos de prueba para la tabla Medical_Practitioner_Availability
INSERT INTO Medical_Practitioner_Availability (medical_practitioner_id, day_of_week, start_time, end_time) VALUES
    (1, 'Monday', '09:00:00', '17:00:00');

-- Datos de prueba para la tabla Failed_Login_Attempts
INSERT INTO Failed_Login_Attempts (user_id, ip_address) VALUES
    (2, '192.168.1.10');
