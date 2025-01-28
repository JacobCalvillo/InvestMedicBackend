import { DataTypes } from "sequelize";
import db  from "../config";

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
            allowNull: false
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