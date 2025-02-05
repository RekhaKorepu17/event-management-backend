import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";
import User from "./user";
import Event from "./event";

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("registered", "cancelled"),
    },
  },
  {
    tableName: "registrations",
    timestamps: false,
  }
);

export default Registration;
