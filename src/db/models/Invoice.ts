import { DataTypes, Model } from "sequelize";
import db from "../config";
import Patient from "./Patient";
import Status from "./Status";

class Invoice extends Model {}

Invoice.init(
    {
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: "id"
            }
        },
        total_amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Status,
                key: "id"
            }
        },
        issue_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: "Invoice",
        sequelize: db   
    }
)


Invoice.belongsTo(Status, {
    foreignKey: {
        name: "status_id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

export default Invoice;