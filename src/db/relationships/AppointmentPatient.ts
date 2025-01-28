import Appointment from "../models/Appointment"
import Patient from "../models/Patient"

Appointment.belongsTo(Patient, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
