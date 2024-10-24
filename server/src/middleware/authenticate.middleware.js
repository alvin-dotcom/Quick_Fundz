const jwt = require('jsonwebtoken');
const connectPostgresDB = require('../db/index'); // Assuming you have a pool setup here

let pool;
(async()=>{
    pool = await connectPostgresDB();
})()
const authenticate = async (req, res, next) => {
    const token =req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId; // Assuming the JWT payload contains the user's ID as `id`
        
        // Optional: Fetch the user from the database to ensure the user exists
        const user = await pool.query("SELECT id FROM users WHERE id = $1", [req.userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user information to the request object if needed
        req.user = user.rows[0];

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;