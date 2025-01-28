import Patient from "../models/Patient";
import Gender from "../models/Gender";

Gender.hasMany(Patient, {
    foreignKey: {
        name: "gender_id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

Patient.belongsTo(Gender, {
    foreignKey: {
        name: "gender_id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});
