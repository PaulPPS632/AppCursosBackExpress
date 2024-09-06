import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("technet","root", "IPGuYPIJMTPqvzmQfDiAqZwaXKfjKvpi",{
    host: "junction.proxy.rlwy.net",
    port: '19463',
    dialect: "mysql"
})