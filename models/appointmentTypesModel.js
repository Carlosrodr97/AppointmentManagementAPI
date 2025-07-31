import mongoose from "mongoose";

const appointmentTypesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const appointmentTypesModel = mongoose.model(
  "AppointmentType",
  appointmentTypesSchema
);

export default appointmentTypesModel;
