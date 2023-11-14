import Masyarakat from "../models/MasyarakatModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";

export const getAllMasyarakat = async (req, res) => {
  const data = await Masyarakat.findAll();

  return res.json(data);
}
export const createMasyarakat = async(req, res) => {
    const data = req.body;

    const rules = Joi.object({
        nik: Joi.required(),
        nama: Joi.required(),
        username: Joi.required(),
        password: Joi.required(),
        telp: Joi.number().required(),
    });

    const validatedData = rules.validate(data);
    if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

    if((data.nik).includes(" ")){
        return res.json({msg:"Nik tidak boleh ada space"})
    }

    const hasil = await bcrypt.hash(data.password, 10)

    try {
        data.password = hasil;
        const response = await Masyarakat.create(data);

        res.json({ 
            msg: "success",
            data: response
        });
    } catch (e) {
        return res.json({ msg: "Nik tidak unique" })
    }
}

export const updateMasyarakat = async (req, res) => {
  const data = req.body;
  const masyarakat = await Masyarakat.findOne({ where: { nik: req.params.id } })

  if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

  const rules = Joi.object({
      nama:Joi.required(),
      username:Joi.required(),
      telp:Joi.required(),
  });

  const validatedData = rules.validate(data);
  if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

  await Masyarakat.update(data,{where:{nik:masyarakat.nik}});
  const response = await Masyarakat.findOne({ where: { nik: req.params.id } })

  return res.json({
      msg:"success",
      data: response
  });
}

export const deleteMasyarakat = async (req, res) => {
  const masyarakat = await Masyarakat.findOne({ where: { nik: req.params.id } });

  if (!masyarakat) return res.json({ msg: "Tidak ada masyarakat" });

  await Masyarakat.destroy({ where: { nik: masyarakat.nik } });

  return res.json({ msg: "success" });
}

