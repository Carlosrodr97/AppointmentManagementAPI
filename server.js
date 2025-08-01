import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import mongoose from "mongoose";

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Conexión con MongoDB
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Conexión a la base de datos exitosa");
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}

app.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT || 8000}`);
});
