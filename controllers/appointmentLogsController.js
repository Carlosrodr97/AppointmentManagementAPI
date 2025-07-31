import appointmentLogsModel from '../models/appointmentLogsModel.js';

// Crear un nuevo registro de cita
export const createAppointmentLog = async (req, res) => {
  try {
    const appointmentLog = new appointmentLogsModel(req.body);
    await appointmentLog.save();
    res.status(201).json(appointmentLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todos los registros de citas
export const getAllAppointmentLogs = async (req, res) => {
  try {
    const appointmentLogs = await appointmentLogsModel.find();
    res.status(200).json(appointmentLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un registro de cita por ID
export const getAppointmentLogById = async (req, res) => {
  try {
    const appointmentLog = await appointmentLogsModel.findById(req.params.id);
    if (!appointmentLog) {
      return res.status(404).json({ error: 'Registro de cita no encontrado' });
    }
    res.status(200).json(appointmentLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un registro de cita
export const updateAppointmentLog = async (req, res) => {
  try {
    const appointmentLog = await appointmentLogsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointmentLog) {
      return res.status(404).json({ error: 'Registro de cita no encontrado' });
    }
    res.status(200).json(appointmentLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar un registro de cita
export const deleteAppointmentLog = async (req, res) => {
  try {
    const appointmentLog = await appointmentLogsModel.findByIdAndDelete(req.params.id);
    if (!appointmentLog) {
      return res.status(404).json({ error: 'Registro de cita no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}