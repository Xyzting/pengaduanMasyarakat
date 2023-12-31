import Pengaduan from "../models/PengaduanModel.js";
import Joi from "joi";
import ImageValindasi from "../Traits/ImageValindasi.js";
import fs from "fs";

export const getAllPengaduan = async (req,res) => {
  const data = await Pengaduan.findAll();
  return res.json(data);
}


export const createPengaduan = async (req,res) => {  
  const data = req.body;
  const rules = Joi.object({
    tgl_pengaduan : Joi.date().required(),
    nik : Joi.required(),
    isi_laporan : Joi.required(),
    status:Joi.required().valid("proses","selesai","0"), 
  })
  
  const ValidatedData = rules.validate(data);
  if(ValidatedData.error) return res.json({errors:ValidatedData.error.details[0].message.replace(/"/g, '')});

  const image = ImageValindasi(req,"foto") 

  if(image.status === "danger") return res.json({errors:image.value})
  
  data.url = image.value.url;
  data.foto = image.value.fileName;

  if(req.body.status !== "proses" && req.body.status !== "selesai" ){
      return res.json({
          status: "Bad Request",
          msg: "status hanya bisa di isi dengan proses dan selesai !!"
      })
  }

  const response = await Pengaduan.create(data);

  return res.json({
      msg:"success",
      data: response
  }); 
}


export const updatePengaduan = async (req,res) => {
  const pengaduan = await Pengaduan.findOne({ where: { id_pengaduan:req.params.id } });
  const data = req.body;
  const rules = Joi.object({
    tgl_pengaduan : Joi.date().required(),
    nik : Joi.required(),
    isi_laporan : Joi.required(),
    status:Joi.required().valid("proses","selesai","0"), 
  }); 
  const ValidatedData = rules.validate(data); 

  if(ValidatedData.error) return res.json({errors:ValidatedData.error.details[0].message.replace(/"/g, '')});
  let image;
  
  if(req.files){
      image = ImageValindasi(req,"foto");
      if(image.status === "danger") return res.json({errors:image.value})
      fs.unlinkSync(`./public/images/${pengaduan.foto}`)
      data.url = image.value.url;
      data.foto = image.value.fileName;
  }

  await Pengaduan.update(data,{where : { id_pengaduan:pengaduan.id_pengaduan }})

  const response = await Pengaduan.findOne({ where: { id_pengaduan:req.params.id } });

  return res.json({
      msg: "success",
      data: response
  });
}


export const deletePengaduan = async (req,res) => {
  const pengaduan = await Pengaduan.findOne({ where : { id_pengaduan:req.params.id } })

  if(!pengaduan) return res.json({errors:"Tidak ada Data"});

  fs.unlinkSync(`./public/images/${pengaduan.foto}`)

  await Pengaduan.destroy({ where:{ id_pengaduan:pengaduan.id_pengaduan } });

  return res.json({msg:"success"})
}
