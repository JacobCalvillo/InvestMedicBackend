import Invoice from "../models/Invoice"
import Patient from "../models/Patient"


Invoice.belongsTo(Patient, {
    foreignKey: {
        name: "patient_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})