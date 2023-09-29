import express from "express";
import PengaduanController from "../controller/PengaduanController.js";

const PengaduanRoute = express.Router()

PengaduanRoute.get("/api/pengaduan",new PengaduanController().index); 
PengaduanRoute.post("/api/pengaduan",new PengaduanController().store); 
PengaduanRoute.put("/api/pengaduan/:id",new PengaduanController().update);
PengaduanRoute.delete("/api/pengaduan/:id",new PengaduanController().destroy);

export default PengaduanRoute;