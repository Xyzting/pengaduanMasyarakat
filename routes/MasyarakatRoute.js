import express from "express";
import MasyarakatController from "../controller/MasyarakatController.js";

const MasyarakatRoute = express.Router()

MasyarakatRoute.get("/",new MasyarakatController().index); 

MasyarakatRoute.get("/api/masyarakat",new MasyarakatController().index);
MasyarakatRoute.post("/api/masyarakat",new MasyarakatController().store);
MasyarakatRoute.put("/api/masyarakat/:id",new MasyarakatController().update);
MasyarakatRoute.delete("/api/masyarakat/:id",new MasyarakatController().destroy);

export default MasyarakatRoute;