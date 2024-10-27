const connectPostgresDB = require("../db/index");
const asyncHandler = require("../utils/asyncHandler")
const filterObj = require("../utils/filterObj")

let pool;
(async()=>{
    pool = await connectPostgresDB();
})();

exports.showKycRequest=asyncHandler(async(req,res)=>{
    const pendingKyc = await pool.query("Select * from user_kyc_details where is_verified=$1",['pending'])
    const listOfRequest = pendingKyc.rows
    res.status(200).json({
        listOfRequest
    })
    
})

exports.confirm_OR_Reject_user=asyncHandler(async(req,res)=>{
    const {status,userId,usersId,message} = req.body;
    try {
        const userStatus= await pool.query("UPDATE user_kyc_details SET is_verified = $1,message=$2 WHERE id = $3",[status,message,userId]);
        const updateUser= await pool.query("UPDATE users SET is_verified = $1 WHERE id = $2",[status,usersId])

        return res.status(200).json({

        })
    } catch (error) {
        console.log(error);
    }
})

exports.getUsers = async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT username, email, role, is_verified FROM users');
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  };


  exports.deleteUser = async (req, res) => {
    const { role } = req.params;
  
    try {
      console.log("Deleting Users:", role);
      const result = await pool.query('DELETE FROM users WHERE role = $1', [role]);
      if (result.rowCount === 0) {
        console.log("User not found with role:", role);
        return res.status(404).json({ message: 'User not found' });
      }
      console.log("User deleted successfully:", role);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error("Error deleting user:", error.message); 
      res.status(500).json({ message: 'Error deleting user', error: error.message }); 
    }
  };