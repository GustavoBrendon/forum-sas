import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  port: 3306, 
  dialect: "mysql",
  database: "forum", 
  username: "root", 
  password: "root", 
});

export default sequelize;
