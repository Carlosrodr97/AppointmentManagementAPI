import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Si el usuario ya existe, retornar un error
    const existingUser = await UserModel.find({ email: req.body.email })
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' })
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new UserModel({ ...req.body, password: hashedPassword })
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener todos los usuarios con el rol de administrador
export const getUsersAdmins = async (req, res) => {
  try {
    const admins = await UserModel.find({ role: 'admin' })
    res.status(200).json(admins)
  } catch (error) {
    res.status(500).json({error: error.message })
  }
}

// Obtener todos los usuarios con el rol de cliente
export const getUsersClients = async (req, res) => {
  try {
    const clients = await UserModel.find({ role: 'client' })
    res.status(200).json(clients)
  } catch (error) {
    res.status(500).json({error: error.message })
  }
}

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  try {
    // Si se proporciona una nueva contraseña, encriptarla
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    // Si el usuario no se encuentra, retornar un error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}