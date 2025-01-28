import Patient from "../models/Patient"
import User from "../models/User"

Patient.belongsTo(User,{
    foreignKey: {
        name: "user_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})