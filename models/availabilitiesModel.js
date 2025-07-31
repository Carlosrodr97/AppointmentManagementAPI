import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true },
    date: { type: String, required: true },
    timeSlots: [
      {
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
      {
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const availabilityModel = mongoose.model("Availabilitys", availabilitySchema);

export default availabilityModel;
