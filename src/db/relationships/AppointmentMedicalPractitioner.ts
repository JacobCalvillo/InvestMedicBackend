import MedicalPractitioner from "../models/MedicalPractitioner"
import Appointment from "../models/Appointment"

MedicalPractitioner.hasMany(Appointment, {
    foreignKey: {
        name: "medical_practitioner_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})