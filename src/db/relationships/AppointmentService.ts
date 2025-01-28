import Service from "../models/Service"
import Appointment from "../models/Appointment"

Service.hasMany(Appointment, {
    foreignKey: {
        name: "service_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})