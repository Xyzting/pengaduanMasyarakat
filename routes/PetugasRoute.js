import express from "express";
import PetugasController from "../controller/PetugasController";

const PetugasRoute = express.Router()

PetugasRoute.get("/petugas",new PetugasController().index);
PetugasRoute.post("/petugas",new PetugasController().store);
PetugasRoute.delete("/petugas/:id/",new PetugasController().destroy);

export default PetugasRoute;