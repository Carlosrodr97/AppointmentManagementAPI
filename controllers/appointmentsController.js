import appointmentsModel from '../models/appointmentsModel.js'
import availabilityModel from '../models/availabilitiesModel.js'

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  try {
    // Validar que el adminId tenga disponibilidad
    const adminAvailability = await availabilityModel.findOne({ adminId: req.body.adminId, date: req.body.date });
    if (!adminAvailability) {
      return res.status(400).json({ error: 'El administrador no tiene disponibilidad para esta fecha' });      
    }

    const appointment = new appointmentsModel(req.body)
    await appointment.save()
    res.status(201).json(appointment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Obtener todas las citas
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentsModel.find()
    res.status(200).json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentsModel.findById(req.params.id)
    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Actualizar una cita
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }
    res.status(200).json(appointment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Eliminar una cita
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await appointmentsModel.findByIdAndDelete(req.params.id)
    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}