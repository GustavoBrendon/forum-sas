import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";
import Perms from "./perms.js";

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  permsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Perms,
      key: "id",
    },
  },
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lockoutUntil: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  nextLoginAttemptAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  }
});

export default User;
