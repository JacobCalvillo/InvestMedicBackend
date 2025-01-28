import { DataTypes, Model } from "sequelize";
import db  from "../config";

class Providers extends Model {}

Providers.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        timestamps: true,
        sequelize: db,
        tableName: "Providers"
    }
)


export default Providers;