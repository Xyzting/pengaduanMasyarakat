import Pengaduan from "../models/PengaduanModel.js";
import Petugas from "../models/PetugasModel.js";
import Tanggapan from "../models/TanggapanModel.js";
import Joi from "joi";

class TanggapanController {

    async index (req,res) {
        const data = await Tanggapan.findAll({include: Pengaduan});
        return res.json({
            msg: "success",
            data: data
        });
    }

    async store (req,res) {

        const data = req.body;

        const rules = Joi.object({
            tgl_tanggapan:Joi.date().required(),
            tanggapan:Joi.required(),
            id_pengaduan:Joi.required(),
            id_petugas:Joi.required(),
        })

        const validatedData = rules.validate(data);
        if(validatedData.error) return res.json({msg:validatedData.error.details[0].message.replace(/"/g, '')});

        try{
            const response = await Tanggapan.create(data);

            return res.json({
                msg: "success",
                data: response
            });
        }catch(e){
            return res.json({msg:e.message})
        }

    }

    async update (req,res){
        const tanggapan = await Tanggapan.findOne({where:{ id_tanggapan:req.params.id }});
        const data = req.body;

        if(!tanggapan) return res.json("Tanggapan tidak ada");

        const rules = Joi.object({
            tanggapan:Joi.required(),
        })

        const validatedData = rules.validate(data);
        if(validatedData.error) return res.json({msg:validatedData.error.details[0].message.replace(/"/g, '')});

        await Tanggapan.update(validatedData.value,{where:{id_tanggapan:tanggapan.id_tanggapan}});

        const response = await Tanggapan.findOne({where:{ id_tanggapan:req.params.id }});

        return res.json({
            msg: "success",
            data: response
        });
    }

    async destroy (req,res) {
        const tanggapan = await Tanggapan.findOne({where:{ id_tanggapan:req.params.id }});

        if(!tanggapan) return res.json("Tanggapan tidak ada");

        await Tanggapan.destroy({where : { id_tanggapan:tanggapan.id_tanggapan }});

        return res.json({msg:"success"});
    }



}

export default TanggapanController;