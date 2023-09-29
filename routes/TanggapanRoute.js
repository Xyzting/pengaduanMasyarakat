import express from "express";
import TanggapanController from "../controller/TanggapanController.js";

const TanggapanRoute = express.Router()

TanggapanRoute.get("/api/tanggapan",new TanggapanController().index);
TanggapanRoute.post("/api/tanggapan",new TanggapanController().store);
TanggapanRoute.put("/api/tanggapan/:id",new TanggapanController().update);
TanggapanRoute.delete("/api/tanggapan/:id",new TanggapanController().destroy);

export default TanggapanRoute;