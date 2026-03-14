import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple Vercel serverless endpoint to create a Supabase user using the
// service role key. Requires the following env vars set in Vercel:
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

function randomPassword(len = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' });
  }

  const apiUrl = SUPABASE_URL.replace(/\/$/, '') + '/auth/v1/admin/users';
  const generatedPassword = password || randomPassword(14);

  try {
    const r = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
      },
      body: JSON.stringify({
        email,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: { is_admin: true },
      }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    return res.status(200).json({ user: data, password: generatedPassword });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
