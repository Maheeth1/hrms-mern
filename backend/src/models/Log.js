import mongoose from 'mongoose';
const LogSchema = new mongoose.Schema(
  {
    organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    meta: { type: Object },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
export default mongoose.model('Log', LogSchema);
