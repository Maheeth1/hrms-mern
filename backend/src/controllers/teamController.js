import Team from '../models/Team.js';
import EmployeeTeam from '../models/EmployeeTeam.js';
import { audit } from '../utils/logger.js';

export async function listTeams(req, res) {
  const { organisationId } = req.user;
  const teams = await Team.find({ organisationId }).sort({ createdAt: -1 });
  res.json(teams);
}

export async function createTeam(req, res) {
  const { organisationId, userId } = req.user; const { name, description } = req.body;
  const team = await Team.create({ organisationId, name, description });
  await audit({ organisationId, userId, action: 'team_created', meta: { teamId: team._id } });
  res.status(201).json(team);
}

export async function updateTeam(req, res) {
  const { organisationId, userId } = req.user; const { id } = req.params;
  const team = await Team.findOneAndUpdate({ _id: id, organisationId }, req.body, { new: true });
  if (!team) return res.status(404).json({ message: 'Not found' });
  await audit({ organisationId, userId, action: 'team_updated', meta: { teamId: id } });
  res.json(team);
}

export async function deleteTeam(req, res) {
  const { organisationId, userId } = req.user; const { id } = req.params;
  const team = await Team.findOneAndDelete({ _id: id, organisationId });
  if (!team) return res.status(404).json({ message: 'Not found' });
  await EmployeeTeam.deleteMany({ organisationId, teamId: id });
  await audit({ organisationId, userId, action: 'team_deleted', meta: { teamId: id } });
  res.json({ ok: true });
}

export async function assignEmployee(req, res) {
  const { organisationId, userId } = req.user; const { teamId } = req.params;
  const { employeeId } = req.body;
  const link = await EmployeeTeam.create({ organisationId, teamId, employeeId });
  await audit({ organisationId, userId, action: 'employee_assigned_to_team', meta: { employeeId, teamId } });
  res.status(201).json(link);
}

export async function unassignEmployee(req, res) {
  const { organisationId, userId } = req.user; const { teamId } = req.params; const { employeeId } = req.body;
  await EmployeeTeam.findOneAndDelete({ organisationId, teamId, employeeId });
  await audit({ organisationId, userId, action: 'employee_unassigned_from_team', meta: { employeeId, teamId } });
  res.json({ ok: true });
}

export async function teamMembers(req, res) {
  const { organisationId } = req.user; const { teamId } = req.params;
  const links = await EmployeeTeam.find({ organisationId, teamId }).populate('employeeId');
  res.json(links.map(l => l.employeeId));
}
