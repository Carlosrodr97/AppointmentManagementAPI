# Appointment Management API

API RESTful para la gestión de citas, usuarios, disponibilidades y tipos de cita. Permite crear, consultar, actualizar y eliminar citas, así como administrar usuarios y registros de cambios.

## Características principales
- Gestión de citas (CRUD)
- Administración de usuarios
- Control de disponibilidades
- Tipos de cita configurables
- Registro de logs de cambios
- Autenticación mediante JWT

## Tecnologías utilizadas
- Node.js
- Express.js
- Cors
- MongoDB (Mongoose)
- Dotenv

## Instalación y configuración

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Carlosrodr97/AppointmentManagementAPI.git
   cd AppointmentManagementAPI
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con la siguiente información:
   ```env
   PORT=8000
   MONGODB_URI=connectionString de tu base de datos de mongoDB
   JWT_SECRET=tu_clave_secreta
   ```

4. **Inicia el servidor en desarrollo:**
   ```bash
   node server.js
   ```


**Nota:** No es necesario crear las colecciones (tablas) manualmente en MongoDB. Al utilizar la API, las colecciones se generarán automáticamente según los modelos definidos en el proyecto.

La API estará disponible en `http://localhost:8000`.

Consulta el código de cada endpoint para conocer los parámetros y respuestas.

## Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request para sugerencias o mejoras.

## Licencia
MIT
