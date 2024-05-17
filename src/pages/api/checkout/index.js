import { verifyToken } from "../../../../utils/jwt";
import { addCartData, getUserByEmail } from "../../../../utils/db";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const allowedOrigins = ['http://localhost:3000', 'https://texagon-assessment.vercel.app']; // Update with your frontend's origins
        const origin = req.headers.origin;

        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const user = getUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { cart } = req.body;

        if (!cart) {
            return res.status(400).json({ error: 'Cart data is required' });
        }

        addCartData(user.email, cart);

        return res.status(200).json({ message: 'Checkout successful' });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
