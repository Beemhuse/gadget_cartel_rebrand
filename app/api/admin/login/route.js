// pages/api/login.js
import { getAdminByEmail } from '@/utils/sanity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { getAdminByEmail } from '@/utils/sanity/client';

const secretKey = process.env.NEXT_PRIVATE_JWT_SECRET_KEY;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Retrieve the admin by email
    const admin = await getAdminByEmail(email);
    if (!admin || admin.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, role: 'admin' },
      secretKey,
      { expiresIn: '7d' }
    );

    return new Response(
      JSON.stringify({
        message: 'Admin signed in successfully!',
        user: admin,
        token,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error during admin login:', error);
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
