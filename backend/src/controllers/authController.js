import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Organisation from '../models/Organisation.js';
import User from '../models/User.js';
import { audit } from '../utils/logger.js';

export async function register(req, res) {
  const { orgName, adminName, email, password } = req.body;
  if (!orgName || !adminName || !email || !password)
    return res.status(400).json({ message: 'Missing fields' });

  const org = await Organisation.create({ name: orgName });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ organisationId: org._id, name: adminName, email, passwordHash });

  const token = jwt.sign(
    { userId: user._id, organisationId: org._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '8h' }
  );

  await audit({ organisationId: org._id, userId: user._id, action: 'organisation_created', meta: { orgId: org._id } });
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
    organisation: { id: org._id, name: org.name }
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id, organisationId: user.organisationId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '8h' }
  );

  await audit({ organisationId: user.organisationId, userId: user._id, action: 'user_logged_in' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function logout(req, res) {
  // Stateless JWT: client deletes token. We still record the event.
  await audit({ organisationId: req.user.organisationId, userId: req.user.userId, action: 'user_logged_out' });
  res.json({ message: 'Logged out' });
}
