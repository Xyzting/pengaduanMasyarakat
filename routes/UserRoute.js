import express from "express";
import { 
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/UsersController.js";

const UserRoute = express.Router()

UserRoute.get("/", getAllUser); 

UserRoute.get("/api/User", getAllUser);
UserRoute.post("/api/User", createUser);
UserRoute.put("/api/User/:id", updateUser);
UserRoute.delete("/api/User/:id", deleteUser);

export default UserRoute;