import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Perms = sequelize.define("Perm", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Perms;
