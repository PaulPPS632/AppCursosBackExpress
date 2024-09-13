import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("railway","root", "ohEXyeLCUUeUZVLeBaLMDIYzVvOBddDc",{
    host: "junction.proxy.rlwy.net",
    port: "56477",
    dialect: "mysql"
});