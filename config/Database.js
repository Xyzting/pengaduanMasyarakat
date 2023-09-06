import { Sequelize } from "sequelize";

const db = new Sequelize("pengaduan_masyarakat","root","pepenn06",{
    host:"localhost",
    dialect:"mysql",
})

export default db;