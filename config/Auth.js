import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/UserModel.js";
import User from "../models/UserModel.js";
dotenv.config()

export const LoginUsers = async (req, res, next) => {
  let { email, password } = req.body;
 
  let existingUsers;
  try {
    existingUsers = await Users.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  const passwordBcrypt = bcrypt.compare(password, existingUsers.password)
  if (!existingUsers || !passwordBcrypt) {
    return res.status(401).json({
      status: "error",
      msg: 'Plis check email or password!'
    });
  }

  let token;
  let refresh_token;
  try {
    token = jwt.sign(
      { userId: existingUsers.id, email: existingUsers.email },
      process.env.JWT_SECRET,
      { expiresIn: "60s" }
    );
    
    refresh_token = jwt.sign(
      { userId: existingUsers.id, email: existingUsers.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); 

    await User.update({ refresh_token: refresh_token }, {where: {id: existingUsers.id}})
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUsers.id,
        email: existingUsers.email,
        token: token,
        refresh_token: refresh_token,
      },
    });
};

export const refresh_token = async(req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) return res.status(401).json({
    status: "error",
    msg: 'E_UNAUTHORIZED_ACCESS: Unauthorized access'
  })

  const user = await User.findOne({where: { refresh_token: token }})

  if(!user) return res.status(403).json({
    status: "error",
    msg: 'E_FORBIDDEN: Forbidden'
  })

  const refresh_token = jwt.sign(
    { token }, 
    process.env.REFRESH_SECRET,
    { expiresIn: "1h" }
  )

  if(refresh_token){
    return res.status(200).json({
      status: "success",
      refresh_token: refresh_token 
    })
  }else {
    return res.status(403).json({
      status: "error",
      msg: 'E_FORBIDDEN: Forbidden'
    })  
  }

}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null ) return res.status(401).json({
    status: "error",
    msg: 'E_UNAUTHORIZED_ACCESS: Unauthorized access'
  })

  jwt.verify(token, process.env.JWT_SECRET)

  next();
}