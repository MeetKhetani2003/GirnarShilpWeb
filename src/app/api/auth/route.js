import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { username, password } = await req.json();
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;

  if (
    username === ADMIN_USER &&
    bcrypt.compareSync(password, ADMIN_PASS_HASH)
  ) {
    const token = jwt.sign({ user: ADMIN_USER }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return new Response(JSON.stringify({ token }), { status: 200 });
  }
  return new Response(JSON.stringify({ error: 'Invalid' }), { status: 401 });
}
