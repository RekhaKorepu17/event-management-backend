import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

const User= sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(64),
        validate: {
           is: /^[a-zA-Z](?=.*[0-9])(?=.*[\W_]).+$/i,
        }, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
    },
    mobile: {
        type: DataTypes.INTEGER,
    }
})
export default User;
