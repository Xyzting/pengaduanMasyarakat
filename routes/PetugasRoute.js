import express from "express";
import PetugasController from "../controller/PetugasController.js";

const PetugasRoute = express.Router()

PetugasRoute.get("/api/petugas",new PetugasController().index);
PetugasRoute.post("/api/petugas",new PetugasController().store);
PetugasRoute.delete("/api/petugas/:id",new PetugasController().destroy);

export default PetugasRoute;