import mongoose from 'mongoose';
const TeamSchema = new mongoose.Schema(
  {
    organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true, index: true },
    name: { type: String, required: true },
    description: String
  },
  { timestamps: true }
);
export default mongoose.model('Team', TeamSchema);
