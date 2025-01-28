import MedicalPractitioner from "../models/MedicalPractitioner"
import User from "../models/User"


MedicalPractitioner.belongsTo(User, {
    foreignKey: {
        name: "user_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})