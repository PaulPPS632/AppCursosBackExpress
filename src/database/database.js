import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("appcursoexpress","paul", "paulp",{
    host: "localhost",
    dialect: "mysql"
});