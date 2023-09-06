import express from "express";
import TanggapanController from "../controller/TanggapanController";

const TanggapanRoute = express.Router()

TanggapanRoute.get("/tanggapan",new TanggapanController().index);
TanggapanRoute.post("/tanggapan",new TanggapanController().store);
TanggapanRoute.put("/tanggapan/:id/",new TanggapanController().update);
TanggapanRoute.delete("/tanggapan/:id/",new TanggapanController().destroy);

export default TanggapanRoute;