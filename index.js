import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import MasyarakatRoute from "./routes/MasyarakatRoute.js";
import PengaduanRoute from "./routes/PengaduanRoute.js";
import PetugasRoute from "./routes/PetugasRoute.js";
import TanggapanRoute from "./routes/TanggapanRoute.js";

const app = express()

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"))
app.use(MasyarakatRoute)
app.use(PengaduanRoute)
app.use(PetugasRoute)
app.use(TanggapanRoute)

app.get("/",(req,res) => res.send("Masih pake api")) 

app.listen(2222, () => console.log(`hello world`))