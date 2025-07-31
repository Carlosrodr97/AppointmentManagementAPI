import availabilityModel from '../models/availabilitiesModel.js';

// Crear una nueva disponibilidad
export const createAvailability = async (req, res) => {
  try {
    // Verificar si la disponibilidad ya existe
    const existingAvailability = await availabilityModel.findOne({
      userId: req.body.userId,
      date: req.body.date
    });

    if (existingAvailability) {
      return res.status(400).json({ error: 'La disponibilidad ya existe para esta fecha' });
    }

    const availability = new availabilityModel(req.body);
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todas las disponibilidades
export const getAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await availabilityModel.find();
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener disponibilidad por ID
export const getAvailabilityById = async (req, res) => {
  try {
    const availability = await availabilityModel.findById(req.params.id);
    if (!availability) {
      return res.status(404).json({ error: 'Disponibilidad no encontrada' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar disponibilidad por ID
export const updateAvailability = async (req, res) => {
  try {
    const availability = await availabilityModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!availability) {
      return res.status(404).json({ error: 'Disponibilidad no encontrada' });
    }
    res.status(200).json(availability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar disponibilidad por ID
export const deleteAvailability = async (req, res) => {
  try {
    await availabilityModel.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: 'Disponibilidad eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}