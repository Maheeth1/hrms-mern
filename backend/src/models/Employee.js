import mongoose from 'mongoose';
const EmployeeSchema = new mongoose.Schema(
  {
    organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true, index: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String
  },
  { timestamps: true }
);
export default mongoose.model('Employee', EmployeeSchema);
