import express from 'express'
import { isAdmin, verifyToken } from '../middlewares/auth.js'
import { getAllUsers, createUser, getUserById, getUsersAdmins, getUsersClients, updateUser, deleteUser } from '../controllers/userController.js'
import { authenticateUser } from '../middlewares/login.js'
import { createAvailability, deleteAvailability, getAllAvailabilities, getAvailabilityById, updateAvailability } from '../controllers/availabilitiesController.js'
import { createAppointmentType, deleteAppointmentType, getAllAppointmentTypes, getAppointmentTypeById, updateAppointmentType } from '../controllers/appointmentTypesController.js'
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from '../controllers/appointmentsController.js'
import { createAppointmentLog, deleteAppointmentLog, getAllAppointmentLogs, getAppointmentLogById, updateAppointmentLog } from '../controllers/appointmentLogsController.js'

const router = express.Router()

// Ruta para el login de usuario
router.post('/login', authenticateUser) // Autenticación de usuario

// Rutas para los usuarios
router.post('/createUser', createUser) // Crear un nuevo usuario
router.get('/getAllUsers', verifyToken, isAdmin, getAllUsers) // Obtener todos los usuarios
router.get('/getUserById/:id', verifyToken, isAdmin, getUserById) // Obtener un usuario por ID
router.get('/getUsersAdmins', verifyToken, isAdmin, getUsersAdmins) // Obtener todos los usuarios con el rol de administrador
router.get('/getUsersClients', verifyToken, isAdmin, getUsersClients) // Obtener todos los usuarios con el rol de cliente
router.put('/updateUser/:id', updateUser) // Actualizar un usuario por ID
router.delete('/deleteUser/:id', verifyToken, isAdmin, deleteUser) // Eliminar un usuario por ID

// Rutas para las disponibilidad de los administradores
router.post('/createAvailability', verifyToken, isAdmin, createAvailability) // Crear una nueva disponibilidad
router.get('/getAllAvailabilities', verifyToken, isAdmin, getAllAvailabilities) // Obtener todas las disponibilidades
router.get('/getAvailabilityById/:id', verifyToken, isAdmin, getAvailabilityById) // Obtener disponibilidad por ID
router.put('/updateAvailability/:id', verifyToken, isAdmin, updateAvailability) // Actualizar disponibilidad por ID
router.delete('/deleteAvailability/:id', verifyToken, isAdmin, deleteAvailability) // Eliminar disponibilidad por ID

// Rutas para los tipos de cita
router.post('/createAppointmentType', verifyToken, isAdmin, createAppointmentType) // Crear un nuevo tipo de cita
router.get('/getAllAppointmentTypes', verifyToken, isAdmin, getAllAppointmentTypes) // Obtener todos los tipos de cita
router.get('/getAppointmentTypeById/:id', verifyToken, isAdmin, getAppointmentTypeById) // Obtener un tipo de cita por ID
router.put('/updateAppointmentType/:id', verifyToken, isAdmin, updateAppointmentType) // Actualizar un tipo de cita
router.delete('/deleteAppointmentType/:id', verifyToken, isAdmin, deleteAppointmentType) // Eliminar un tipo de cita

// Rutas para las citas
router.post('/createAppointment', verifyToken, createAppointment) // Crear una nueva cita
router.get('/getAllAppointments', verifyToken, isAdmin, getAllAppointments) // Obtener todas las citas
router.get('/getAppointmentById/:id', verifyToken, isAdmin, getAppointmentById) // Obtener una cita por ID
router.put('/updateAppointment/:id', verifyToken, isAdmin, updateAppointment) // Actualizar una cita
router.delete('/deleteAppointment/:id', verifyToken, isAdmin, deleteAppointment) // Eliminar una cita por ID

// Rutas para los registros de citas
router.post('/createAppointmentLog', verifyToken, isAdmin, createAppointmentLog) // Crear un nuevo registro de cita
router.get('/getAllAppointmentLogs', verifyToken, isAdmin, getAllAppointmentLogs) // Obtener todos los registros de citas
router.get('/getAppointmentLogById/:id', verifyToken, isAdmin, getAppointmentLogById) // Obtener un registro de cita por ID
router.put('/updateAppointmentLog/:id', verifyToken, isAdmin, updateAppointmentLog) // Actualizar un registro de cita
router.delete('/deleteAppointmentLog/:id', verifyToken, isAdmin, deleteAppointmentLog) // Eliminar un registro de cita por ID

export default router