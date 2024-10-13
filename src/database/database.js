import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize("railway","root", "pKcoqhtJHeZgnkTWgSzIhFiptoisqMJz",{
//     host: "junction.proxy.rlwy.net",
//     port: "50255",
//     dialect: "mysql"
// });

export const sequelize = new Sequelize("cursos_app_v1","root", "",{
    host: "localhost",
    port: "3306",
    dialect: "mysql"
});