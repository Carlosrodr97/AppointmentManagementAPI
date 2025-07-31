import mongoose from "mongoose";

const appointmentLogsSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true },
    action: { type: String, required: true },
    performedBy: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

const appointmentLogsModel = mongoose.model(
  "AppointmentLog",
  appointmentLogsSchema
);

export default appointmentLogsModel;
