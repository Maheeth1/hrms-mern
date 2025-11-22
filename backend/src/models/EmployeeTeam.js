import mongoose from 'mongoose';
const EmployeeTeamSchema = new mongoose.Schema(
  {
    organisationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true, index: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
    assignedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
EmployeeTeamSchema.index({ employeeId: 1, teamId: 1 }, { unique: true });
export default mongoose.model('EmployeeTeam', EmployeeTeamSchema);
