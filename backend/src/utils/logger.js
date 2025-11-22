import Log from '../models/Log.js';
export async function audit({ organisationId, userId, action, meta }) {
  try {
    await Log.create({ organisationId, userId, action, meta });
  } catch (e) {
    console.error('Log write failed', e.message);
  }
}
