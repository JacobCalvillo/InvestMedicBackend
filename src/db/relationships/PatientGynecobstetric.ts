import Patient from "../models/Patient";
import Insurance from "../models/Insurance";

Insurance.hasMany(Patient, {
    foreignKey: {
        name: "insurance_id"
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})