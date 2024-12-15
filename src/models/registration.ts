import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

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
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events",
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
