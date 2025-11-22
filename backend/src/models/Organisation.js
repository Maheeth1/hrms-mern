import mongoose from 'mongoose';
const OrganisationSchema = new mongoose.Schema(
  { name: { type: String, required: true, trim: true } },
  { timestamps: true }
);
export default mongoose.model('Organisation', OrganisationSchema);
