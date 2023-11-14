import express from "express";
import { 
  getAllMasyarakat,
  createMasyarakat,
  deleteMasyarakat,
  updateMasyarakat,
} from "../controller/MasyarakatController.js";
import { authenticateToken } from "../config/Auth.js";

const MasyarakatRoute = express.Router()

MasyarakatRoute.get("/", getAllMasyarakat); 

MasyarakatRoute.get("/api/masyarakat", getAllMasyarakat);
MasyarakatRoute.post("/api/masyarakat", createMasyarakat);
MasyarakatRoute.put("/api/masyarakat/:id", updateMasyarakat);
MasyarakatRoute.delete("/api/masyarakat/:id", deleteMasyarakat);

export default MasyarakatRoute;