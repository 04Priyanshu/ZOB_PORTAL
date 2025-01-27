import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        req.id = decoded.userID;
        next();
    } catch (error) {
        console.log(error);
    }
};
export default isAuth;