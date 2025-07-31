import appointmentTypesModel from "../models/appointmentTypesModel.js";

// Crear un nuevo tipo de cita
export const createAppointmentType = async (req, res) => {
  try {
    // Verificar si el tipo de cita ya existe
    const existingType = await appointmentTypesModel.findOne({ name: req.body.name });
    if (existingType) {
      return res.status(400).json({ error: 'El tipo de cita ya existe' });
    }
    const appointmentType = new appointmentTypesModel(req.body);
    await appointmentType.save();
    res.status(201).json(appointmentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todos los tipos de cita
export const getAllAppointmentTypes = async (req, res) => {
  try {
    const appointmentTypes = await appointmentTypesModel.find();
    res.status(200).json(appointmentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un tipo de cita por ID
export const getAppointmentTypeById = async (req, res) => {
  try {
    const appointmentType = await appointmentTypesModel.findById(req.params.id);
    if (!appointmentType) {
      return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    }
    res.status(200).json(appointmentType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un tipo de cita
export const updateAppointmentType = async (req, res) => {
  try {
    const appointmentType = await appointmentTypesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointmentType) {
      return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    }
    res.status(200).json(appointmentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar un tipo de cita
export const deleteAppointmentType = async (req, res) => {
  try {
    const appointmentType = await appointmentTypesModel.findByIdAndDelete(req.params.id);
    if (!appointmentType) {
      return res.status(404).json({ error: 'Tipo de cita no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de cita eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}