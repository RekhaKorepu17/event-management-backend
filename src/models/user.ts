import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";
import { User } from "../types/User";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    mobile: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false,
      defaultValue: "User",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
export default User;
