import { Model } from 'sequelize'
import db from '../config'

class UserRole extends Model {}
UserRole.init(
    {},
    {
        sequelize: db,
        tableName: 'User_Role',
        timestamps: false
    }  
)

export default UserRole;