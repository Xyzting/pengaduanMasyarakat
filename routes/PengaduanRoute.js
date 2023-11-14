import express from "express";
import { 
  getAllPengaduan,
  createPengaduan,
  updatePengaduan,
  deletePengaduan,
} from "../controller/PengaduanController.js";
import { authenticateToken } from "../config/Auth.js";

const PengaduanRoute = express.Router()

PengaduanRoute.get("/api/pengaduan", getAllPengaduan); 
PengaduanRoute.post("/api/pengaduan", createPengaduan); 
PengaduanRoute.put("/api/pengaduan/:id", updatePengaduan);
PengaduanRoute.delete("/api/pengaduan/:id", deletePengaduan);

export default PengaduanRoute;