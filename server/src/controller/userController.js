const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectPostgresDB = require("../db/index");
const asyncHandler= require("../utils/asyncHandler")
const filterObj = require("../utils/filterObj")

 let pool;
 (async()=>{
  pool = await connectPostgresDB();
 })();
 
exports.registerUser = asyncHandler(async(req, res, next)=>{
    const { username, email, password } = req.body;
    
    // Filter the body to include only necessary fields
  const filteredBody = filterObj(req.body, "username", "email", "password");

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [filteredBody.username, filteredBody.email, hashedPassword]
    );
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    
    const role = user.rows[0].role
    const user_id=user.rows[0].id; 
    const verificationStatus=user.rows[0].is_verified;
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "360000h" }
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
  }
    res.cookie("token",token,options).status(201).json({ message: "User registered successfully" ,role,user_id,verificationStatus});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
})

exports.loginUser= asyncHandler(async(req,res)=>{
    const { email, password } = req.body;

    try {
       
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
  
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "360000h" }
      );
  const role = user.rows[0].role
  const user_id=user.rows[0].id;
  const verificationStatus=user.rows[0].is_verified;
      res.json({ token, role , user_id,verificationStatus});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
})

/* router.get("/me", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: verified.userId });
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}); */