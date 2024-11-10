import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Codeledge","paul", "paulp",{
    host: "localhost",
    port: "3306",
    dialect: "mysql"
});