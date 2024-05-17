import {addUser, userExists} from "../../../../utils/db";
import {generateToken} from "../../../../utils/jwt";

export default function handler(req, res) {
    // Enable CORS for all routes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Include OPTIONS for preflight
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        // Preflight request, respond with 200
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({error: 'Name, email, and password are required'});
        }

        if (userExists(email)) {
            return res.status(400).json({error: 'User already exists'});
        }

        const newUser = {username, email, password}; // Note: In a real-world app, you should hash the password
        addUser(newUser);

        const token = generateToken({email});

        return res.status(201).json({token});
    } else {
        return res.status(405).json({error: 'Method not allowed'});
    }
}
