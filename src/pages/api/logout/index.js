// app/api/logout/index.js
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // 1. Invalidate JWT or Session:
        // a. JWT: No specific action needed (client should discard the token).
        // b. Session: Clear the session cookie on the server.

        return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
