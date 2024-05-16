// app/api/login/index.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d'; // Token expiration time (e.g., 1 day)

// In-memory user data (replace with your actual user data or database logic)
const users = [
    { id: 1, username: 'user', password: '$2a$10$y5Yj97j7.0XhF7rF6xW0a.kP595z1xZ777777777777777777777' }, // Hashed password for "password"
];

export async function POST(request) {
    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // 1. Find User (from the in-memory array)
    const user = users.find((u) => u.username === username);

    if (!user) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // 2. Verify Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // 3. Authentication Success (Generate JWT)
    const payload = { userId: user.id };
    const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return NextResponse.json({ message: 'Login successful', token: jwtToken }, { status: 200 });
}
