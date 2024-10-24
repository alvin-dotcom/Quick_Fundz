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
    const {status,userId,usersId} = req.body;
    try {
        const userStatus= await pool.query("UPDATE user_kyc_details SET is_verified = $1 WHERE id = $2",[status,userId]);
        const updateUser= await pool.query("UPDATE users SET is_verified = $1 WHERE id = $2",[status,usersId])

        return res.status(200).json({

        })
    } catch (error) {
        console.log(error);
    }
})