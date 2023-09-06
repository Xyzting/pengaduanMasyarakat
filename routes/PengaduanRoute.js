import express from "express";
import PengaduanController from "../controller/PengaduanController.js";

const PengaduanRoute = express.Router()

PengaduanRoute.get("/pengaduan",new PengaduanController().index); 
PengaduanRoute.post("/pengaduan",new PengaduanController().store); 
PengaduanRoute.put("/pengaduan/:id/",new PengaduanController().update);
PengaduanRoute.delete("/pengaduan/:id/",new PengaduanController().destroy);

export default PengaduanRoute;