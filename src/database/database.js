import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("app","root", "gBgcoUhrYxUynrTgloQljoMPdbsycNAX",{
    host: "autorack.proxy.rlwy.net",
    port: "35747",
    dialect: "mysql"
});