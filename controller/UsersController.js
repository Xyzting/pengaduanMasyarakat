import User from "../models/UserModel.js";
import Joi from "joi";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res) => {
  const data = await User.findAll();

  return res.json({
      msg: "success",
      data: data
  });
}
export const createUser = async(req, res) => {
    const data = req.body;

    const rules = Joi.object({
        email: Joi.required(),
        username: Joi.required(),
        password: Joi.required(),
    });

    const validatedData = rules.validate(data);
    if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

    const hasil = await bcrypt.hash(data.password, 10)

    try {
        data.password = hasil;
        const response = await User.create(data);

        res.json({ 
            msg: "success",
            data: response
        });
    } catch (e) {
        return res.json({ msg: "Nik tidak unique" })
    }
}

export const updateUser = async (req, res) => {
  const data = req.body;
  const User = await User.findOne({ where: { id: req.params.id } })

  if (!User) return res.json({ msg: "Tidak ada User" });

  const rules = Joi.object({
      email:Joi.required(),
      username:Joi.required(),
      password:Joi.required(),
  });

  const validatedData = rules.validate(data);
  if (validatedData.error) return res.json({ msg: validatedData.error.details[0].message.replace(/"/g, '') });

  await User.update(data,{where:{id:User.id}});
  const response = await User.findOne({ where: { id: req.params.id } })

  return res.json({
      msg:"success",
      data: response
  });
}

export const deleteUser = async (req, res) => {
  const User = await User.findOne({ where: { id: req.params.id } });

  if (!User) return res.json({ msg: "Tidak ada User" });

  await User.destroy({ where: { id: User.id } });

  return res.json({ msg: "success" });
}

