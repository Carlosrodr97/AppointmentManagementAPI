import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    adminId: { type: String, required: true },
    appointmentTypeId: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const appointmentsModel = mongoose.model("Appointment", appointmentSchema);

export default appointmentsModel;
