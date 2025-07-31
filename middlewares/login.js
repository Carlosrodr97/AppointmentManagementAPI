import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Middleware para verificar si el usuario está autenticado
export const authenticateUser = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.body.email });

    if (user.length === 0) {
      return res.status(404).json({ error: "Usuario o contraseña no válido" });
    } // Verificar si existe el usuario

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user[0].password
    ); // Comparar la contraseña proporcionada con la almacenada

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Usuario o contraseña no válido" });
    } // Verificar la contraseña

    const token = jwt.sign(
      {
        id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        phone: user[0].phone,
      },
      process.env.JWT_KEY,
      { expiresIn: "12h" }
    ); // Generar un token JWT

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
