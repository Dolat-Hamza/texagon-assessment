// app/api/register/route.js
import { NextResponse } from "next/server";
import * as jose from "jose";

// Secret key for signing JWTs (store this securely in environment variables)
const JWT_SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || "your_secret_key"
);
const JWT_EXPIRES_IN = "1d"; // Token expiration time (e.g., 1 day)
const jsonbinSecret = process.env.JSONBIN_SECRET || "your_secret_key"; // Make sure you have this in .env.local file
const jsonbinId = process.env.JSONBIN_ID || "your_secret_key"; // Make sure you have this in .env.local file
export const runtime = "edge";

async function hashPassword(password) {
    const passwordBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

export default async function POST(request) {
    const body = await request.json();
    const { username, password, email } = body;

    // 1. Input Validation
    if (!username || !password || !email) {
        return NextResponse.json(
            { error: "Username, email, and password are required" },
            { status: 400 }
        );
    }

    if (!validateEmail(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json(
            { error: "Password must be at least 8 characters long" },
            { status: 400 }
        );
    }

    try {
        // 2. Check for Existing User (read from JSONBIN)
        let users = [];
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": jsonbinSecret,
                },
            });
            if (response.ok) {
                const data = await response.json();
                users = data.record;
            }
        } catch (error) {
            console.error("Error fetching JSONBIN data:", error);
        }

        const existingUser = users.find(
            (user) => user.username === username || user.email === email
        );
        if (existingUser) {
            return NextResponse.json(
                { error: "Username or email already exists" },
                { status: 409 }
            ); // Conflict
        }

        // 3. Hash Password
        const hashedPassword = await hashPassword(password);

        // 4. Store User Data (in JSONBIN)
        const newUser = {
            id: Date.now(),
            username,
            email,
            password: hashedPassword,
        };
        users.push(newUser);
        await fetch(`https://api.jsonbin.io/v3/b/${jsonbinId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": jsonbinSecret,
            },
            body: JSON.stringify(users, null, 2), // Beautify with indentation
        })
            .then((response) => {
                console.log(`Data updated successfully: ${response.status}`);
            })
            .catch((error) => {
                console.error("Error updating JSONBIN data:", error);
            });

        // 5. Generate JWT
        const payload = { userId: newUser.id, username: newUser.username };
        const token = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(JWT_EXPIRES_IN)
            .sign(JWT_SECRET_KEY);

        return NextResponse.json(
            {
                message: "User registered successfully",
                token: token,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}