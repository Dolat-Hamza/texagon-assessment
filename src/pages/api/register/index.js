import {addUser, userExists} from "../../../../utils/db";
import {generateToken} from "../../../../utils/jwt";

export default function handler(req, res) {
    // Enable CORS for all routes
    res.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting in production
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    console.log(req.method)


    if (req.method === 'POST') {
        try {
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
        } catch (error) {
            return res.status(500).json({error: error.message});
        }

    } else {
        return res.status(400).json({error: 'Method not allowed'});
    }
}
