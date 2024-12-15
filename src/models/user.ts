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
    },
    password: {
      type: DataTypes.STRING(64),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
