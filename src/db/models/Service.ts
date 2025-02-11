import { DataTypes, Model } from "sequelize";
import db  from "../config";

class Service extends Model {}

Service.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(2083),
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: "Service",
        sequelize: db
    }
)



export default Service;