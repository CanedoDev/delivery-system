import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'nao foi possivel fazer login' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(401).json({ message: 'nao foi possivel fazer o login' });
        req.user = user;
        next();
    })
}