import express from "express";
import { LoginUsers, refresh_token } from "../config/Auth.js";

const AuthRoute = express.Router();

AuthRoute.post("/api/login", LoginUsers);
AuthRoute.get("/api/token", refresh_token);

export default AuthRoute;