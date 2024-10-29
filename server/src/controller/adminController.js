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

exports.getAllKycDetails = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT user_id, name, email, phone_number, aadhar_number, is_verified, bank_account_number, ifsc_code 
         FROM user_kyc_details`
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching KYC details:', error);
      res.status(500).json({ message: 'Error fetching KYC details' });
    }
  };

  exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM user_kyc_details WHERE user_id = $1', [userId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };