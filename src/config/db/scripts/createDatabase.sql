CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    profile_picture_url VARCHAR(2083) NULL
);

-- Tabla de Roles
CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Relación Usuario-Roles (Muchos a Muchos)
CREATE TABLE User_Role (
    user_id INT REFERENCES "User"(id) ON DELETE CASCADE,
    role_id INT REFERENCES Role(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Tabla de Pacientes
CREATE TABLE Patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    weight DECIMAL(10,2) NULL,
    height DECIMAL(10,2) NULL,
    gender VARCHAR(15) NULL,
    street VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code varchar(10),
    occupation VARCHAR(50) NULL,
    emergency_contact_name VARCHAR(40) NULL,
    emergency_contact_last_name VARCHAR(50) NULL,
    emergency_contact_relationship VARCHAR(20) NULL,
    emergency_contact_phone VARCHAR(20) NULL,
    marital_status VARCHAR(20) NULL,
    privacy_consent BOOLEAN DEFAULT TRUE,
    user_id INT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE
);

-- Historial Médico del Paciente
CREATE TABLE Medical_History (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES Patient(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- Ej: "Alergias", "Antecedentes familiares"
    details TEXT
);

-- Tabla de Personal Médico
CREATE TABLE Medical_Practitioner (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    user_id INT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE
);

-- Tabla de Especialidades Médicas
CREATE TABLE Specialty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NULL
);

-- Relación Médico-Especialidad (Muchos a Muchos)
CREATE TABLE Medical_Practitioner_Specialty (
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE CASCADE,
    specialty_id INT REFERENCES Specialty(id) ON DELETE CASCADE,
    PRIMARY KEY (medical_practitioner_id, specialty_id)
);

-- Tabla de Servicios Médicos
CREATE TABLE Service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(2083) NULL
);

-- Relación Médico-Servicio (Muchos a Muchos)
CREATE TABLE Medical_Practitioner_Service (
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE CASCADE,
    service_id INT REFERENCES Service(id) ON DELETE CASCADE,
    PRIMARY KEY (medical_practitioner_id, service_id)
);

-- Tabla de Estados (Ej: "Pendiente", "Completado", etc.)
CREATE TABLE Status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Tabla de Citas Médicas
CREATE TABLE Appointment (
    id SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    reason TEXT,
    status_id INT REFERENCES Status(id) ON DELETE SET NULL,
    patient_id INT REFERENCES Patient(id) ON DELETE CASCADE,
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE CASCADE,
    service_id INT REFERENCES Service(id) ON DELETE CASCADE
);

-- Tabla de Consultas Médicas
CREATE TABLE Consult (
    id SERIAL PRIMARY KEY,
    diagnosis TEXT,
    notes TEXT,
    appointment_id INT NOT NULL REFERENCES Appointment(id) ON DELETE CASCADE
);

-- Tabla de Métodos de Pago
CREATE TABLE Payment_Method (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Tabla de Pagos
CREATE TABLE Payment (
    id SERIAL PRIMARY KEY,
    stripe_payment_id TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(5) NOT NULL,
    payment_method_id INT NOT NULL REFERENCES Payment_Method(id) ON DELETE SET NULL,
    patient_id INT NOT NULL REFERENCES Patient(id) ON DELETE CASCADE,
    invoice_id INT NOT NULL
);

-- Tabla de Facturación
CREATE TABLE Invoice (
    id SERIAL PRIMARY KEY,
    total_amount DECIMAL(10,2) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NULL,
    patient_id INT NOT NULL REFERENCES Patient(id) ON DELETE CASCADE,
    status_id INT NOT NULL REFERENCES Status(id) ON DELETE SET NULL
);

-- Detalle de Factura (Para múltiples servicios en una factura)
CREATE TABLE Invoice_Details (
    id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES Invoice(id) ON DELETE CASCADE,
    service_id INT REFERENCES Service(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    subtotal DECIMAL(10,2)
);

-- Tabla de Seguros
CREATE TABLE Insurance (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Relación Paciente-Seguros (Muchos a Muchos)
CREATE TABLE Patient_Insurance (
    patient_id INT REFERENCES Patient(id) ON DELETE CASCADE,
    insurance_id INT REFERENCES Insurance(id) ON DELETE CASCADE,
    PRIMARY KEY (patient_id, insurance_id)
);

-- Tabla de Identificaciones de Usuarios
CREATE TABLE Identification_User (
    id SERIAL PRIMARY KEY,
    number VARCHAR(100) UNIQUE NOT NULL,
    identification_document_url VARCHAR(2083) NULL,
    identification_type_id INT NOT NULL REFERENCES Identification_Type(id) ON DELETE CASCADE
);

-- Tipos de Identificación (DNI, Pasaporte, etc.)
CREATE TABLE Identification_Type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de Consentimientos
CREATE TABLE Consent (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    description TEXT NULL
);

-- Tabla de Obstetricia y Ginecología (para pacientes mujeres)
CREATE TABLE Obstetricians (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patient(id) ON DELETE CASCADE,
    pregnancies INT,
    births INT,
    cesarean_sections INT,
    misbirths INT,
    last_date_of_menstruation DATE,
    contraceptive_methods TEXT
);

-- Tabla de Retroalimentación de los Pacientes
CREATE TABLE Feedback (
    id SERIAL PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    patient_id INT REFERENCES Patient(id) ON DELETE SET NULL,
    service_id INT REFERENCES Service(id) ON DELETE SET NULL,
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE SET NULL
);

-- Tabla de Registro de Auditoría
CREATE TABLE Audit_Log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(id) ON DELETE SET NULL,
    action VARCHAR(100),
    table_name VARCHAR(40),
    record_id INT,
    changes TEXT, -- JSON con los cambios
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Prescription (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patient(id) ON DELETE CASCADE,
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE CASCADE,
    date_issued DATE DEFAULT CURRENT_DATE,
    notes TEXT
);

CREATE TABLE Prescription_Medication (
    prescription_id INT REFERENCES Prescription(id) ON DELETE CASCADE,
    medication_name VARCHAR(100),
    dosage VARCHAR(50),
    instructions TEXT,
    PRIMARY KEY (prescription_id, medication_name)
);

CREATE TABLE Medical_Practitioner_Availability (
    id SERIAL PRIMARY KEY,
    medical_practitioner_id INT REFERENCES Medical_Practitioner(id) ON DELETE CASCADE,
    day_of_week VARCHAR(15), -- Ej: "Monday"
    start_time TIME,
    end_time TIME
);

CREATE TABLE Failed_Login_Attempts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "User"(id) ON DELETE CASCADE,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);
CREATE TABLE Patient_Identification (
    patient_id INT REFERENCES Patient(id) ON DELETE CASCADE,
    identification_id INT REFERENCES Identification_User(id) ON DELETE CASCADE,
    PRIMARY KEY (patient_id, identification_id)
);

CREATE INDEX idx_patient_name ON Patient(name, last_name);
CREATE INDEX idx_appointment_date ON Appointment(start_time);
CREATE UNIQUE INDEX unique_appointment
    ON Appointment (medical_practitioner_id, start_time, end_time);

