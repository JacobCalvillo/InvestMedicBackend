import { DataTypes, Model } from "sequelize";
import db from "../config";
import User from "./User";

class Notification extends Model { }

Notification.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sent_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: "Notification",
        sequelize: db
    }
)


export default Notification;