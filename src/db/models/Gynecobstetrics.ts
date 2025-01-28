import { DataTypes, Model } from "sequelize";
import db from "../config";
import Patient from "./Patient";

class Gynecobstetrics extends Model {}

Gynecobstetrics.init(
    {
        pregnancies: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        births: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cesarean_sections: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        misbirths: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        last_date_of_menstruation: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        contraceptive_methods: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        timestamps: true,
        tableName: "Gynecobstetrics",
        sequelize: db
    }
)


export default Gynecobstetrics;