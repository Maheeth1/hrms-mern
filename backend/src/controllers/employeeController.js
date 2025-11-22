import Employee from '../models/Employee.js';
import EmployeeTeam from '../models/EmployeeTeam.js';
import { audit } from '../utils/logger.js';

export async function listEmployees(req, res) {
  const { organisationId } = req.user;
  const employees = await Employee.find({ organisationId }).sort({ createdAt: -1 });
  res.json(employees);
}

export async function getEmployee(req, res) {
  const { organisationId } = req.user; const { id } = req.params;
  const emp = await Employee.findOne({ _id: id, organisationId });
  if (!emp) return res.status(404).json({ message: 'Not found' });
  res.json(emp);
}

export async function createEmployee(req, res) {
  const { organisationId, userId } = req.user;
  const { firstName, lastName, email, phone } = req.body;
  const emp = await Employee.create({ organisationId, firstName, lastName, email, phone });
  await audit({ organisationId, userId, action: 'employee_created', meta: { employeeId: emp._id } });
  res.status(201).json(emp);
}

export async function updateEmployee(req, res) {
  const { organisationId, userId } = req.user; const { id } = req.params;
  const emp = await Employee.findOneAndUpdate({ _id: id, organisationId }, req.body, { new: true });
  if (!emp) return res.status(404).json({ message: 'Not found' });
  await audit({ organisationId, userId, action: 'employee_updated', meta: { employeeId: id } });
  res.json(emp);
}

export async function deleteEmployee(req, res) {
  const { organisationId, userId } = req.user; const { id } = req.params;
  const emp = await Employee.findOneAndDelete({ _id: id, organisationId });
  if (!emp) return res.status(404).json({ message: 'Not found' });
  await EmployeeTeam.deleteMany({ organisationId, employeeId: id });
  await audit({ organisationId, userId, action: 'employee_deleted', meta: { employeeId: id } });
  res.json({ ok: true });
}
