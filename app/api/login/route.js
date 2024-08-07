import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email().endsWith('@zod.com'),
  username: z.string().min(5, 'Username must be at least 5 characters long'),
  password: z.string().min(10, 'Password must be at least 10 characters long').regex(/\d/, 'Password must contain at least one number'),
});

export async function POST(request) {
  const data = await request.json();

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.errors });
  }

  if (data.password === '12345') {
    return NextResponse.json({ success: true, message: 'Welcome back!' });
  } else {
    return NextResponse.json({ success: false, message: 'Wrong password' });
  }
}
