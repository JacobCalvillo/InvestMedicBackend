import Consult from "../models/Consult"
import Appointment from "../models/Appointment"

Consult.belongsTo(Appointment, {
    foreignKey: {
        name: "appointment_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})