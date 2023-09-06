import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import MasyarakatRoute from "./routes/MasyarakatRoute";
import PengaduanRoute from "./routes/PengaduanRoute";
import PetugasRoute from "./routes/PetugasRoute";
import TanggapanRoute from "./routes/TanggapanRoute";

const app = express()
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"))
app.use(MasyarakatRoute)
app.use(PengaduanRoute)
app.use(PetugasRoute)
app.use(TanggapanRoute)

app.get("/",(req,res) => res.send("Masih pake api")) 

app.listen(port,() => console.log(`serve berjalan di http://localhost:${port}`))