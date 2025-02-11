import { DataTypes } from "sequelize";
import db  from "../config";
import User from "./User";

const AuditLog = db.define(
    "AuditLog",
    {
        action: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        table_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        }
    },
    {
        timestamps: false,
        tableName: "Audit_Log"
    }
)

export default AuditLog;