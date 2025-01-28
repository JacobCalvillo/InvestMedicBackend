import { DataTypes, Model } from "sequelize";
import db from "../config";
import Patient from "./Patient";
import MedicalPractitioner from "./MedicalPractitioner";
import Staff from "./Staff";
import Role from "./Role";

class User extends Model {
    declare id: number;
    declare username: string;
    declare password: string;
    declare email: string;
    declare phone: string;
    declare profile_picture_url: string;
}

User.init(
    {
        username: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        profile_picture_url: {
            type: DataTypes.STRING(2083),
            allowNull: true 
        },
    },
    {
        sequelize: db,
        timestamps: true,
        modelName: "User"
    }
)


User.hasOne(Patient, {
    foreignKey: {
        name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.hasOne(MedicalPractitioner, {
    foreignKey: {
        name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.hasOne(Staff, {
    foreignKey: {
        name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.belongsToMany(Role, {through: "User_Role"})

export default User;
