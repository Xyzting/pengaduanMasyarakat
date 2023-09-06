import express from "express";
import MasyarakatController from "../controller/MasyarakatController.js";

const MasyarakatRoute = express.Router()

MasyarakatRoute.get("/",new MasyarakatController().index); 

MasyarakatRoute.get("/masyarakat",new MasyarakatController().index);
MasyarakatRoute.post("/masyarakat",new MasyarakatController().store);
MasyarakatRoute.put("/masyarakat/:id/",new MasyarakatController().update);
MasyarakatRoute.delete("/masyarakat/:id/",new MasyarakatController().destroy);

export default MasyarakatRoute;