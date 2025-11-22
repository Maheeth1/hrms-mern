import Log from '../models/Log.js';
export async function listLogs(req, res) {
  const { organisationId } = req.user;
  const { action, userId, limit = 100 } = req.query;
  const q = { organisationId };
  if (action) q.action = action;
  if (userId) q.userId = userId;
  const logs = await Log.find(q).sort({ createdAt: -1 }).limit(Number(limit));
  res.json(logs);
}
