import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user) => {
    return jwt.sign(user, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};
