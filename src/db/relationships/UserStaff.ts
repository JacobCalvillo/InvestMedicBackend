import Staff from "../models/Staff"
import User from "../models/User"

Staff.belongsTo(User, {
    foreignKey: {
        name: "user_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})