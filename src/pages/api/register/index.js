import { addUser, userExists } from "../../../../utils/db";
import { generateToken } from "../../../../utils/jwt";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const allowedOrigins = ['http://localhost:3000', 'https://texagon-assessment.vercel.app']; // Update with your frontend's origins
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        if (userExists(email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = { username, email, password }; // Note: In a real-world app, you should hash the password
        addUser(newUser);

        const token = generateToken({ email });

        return res.status(201).json({ token });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
