import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("railway","root", "pKcoqhtJHeZgnkTWgSzIhFiptoisqMJz",{
    host: "junction.proxy.rlwy.net",
    port: "50255",
    dialect: "mysql"
});