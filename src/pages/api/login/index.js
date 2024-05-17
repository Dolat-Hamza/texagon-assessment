import { getUserByEmail } from "../../../../utils/db";
import { generateToken } from "../../../../utils/jwt";

export default function handler(req, res) {
    // Enable CORS for all routes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Preflight request, respond with 200
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (user.password !== password) { // Note: In a real-world app, use hashed passwords
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken({ email });

        return res.status(200).json({ token });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
