import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define("user",{
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
},{freezeTableName:true})

await User.sync();

export default User;