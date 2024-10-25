const connectPostgresDB = require("../db/index");
const asyncHandler = require("../utils/asyncHandler")
const filterObj = require("../utils/filterObj")

let pool;
(async () => {
    pool = await connectPostgresDB();
})();

/*exports.userKyc = asyncHandler(async(req,res)=>{
   const {fullName,email,phoneNumber,aadharNumber}=req.body;
       const filteredBody = filterObj(req.body,"fullName","email","phoneNumber","aadharNumber");
   try {
       
       const userExist = await pool.query("Select * from users where email = $1",[email])
       const kycuserExist = await pool.query("Select * from user_kyc_details where email = $1",[email])
       if (userExist.rows.length>0){
           if(kycuserExist.rows.length>0){
              return res.status(401).json({
                   status:401,
                   message:"Email already exists"
               })
           }else{
               pool.query("INSERT INTO user_kyc_details (name, email, phone_number,aadhar_number) VALUES ($1, $2, $3,$4)",
                   [filteredBody.fullName, filteredBody.email, filteredBody.phoneNumber,filteredBody.aadharNumber])
           }
       }else{
           res.status(401).json({
               status:401,
               message:"Wrong credentials"
           })
       }
       res.status(200).json({
           status:success,
           message:"KYC under processing"
       })
   } catch (error) {
       console.log(error)
        res.status(400).json({
           status:error,
           message:"Something went wrong",error
       }) 
   }
}) */

exports.userKyc = asyncHandler(async (req, res,next) => {
    const {userId}=req
    const { fullName, email, phoneNumber, aadharNumber } = req.body;
    const filteredBody = filterObj(req.body, "fullName", "email", "phoneNumber", "aadharNumber");

    // Validate phone number and Aadhar number
    const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const aadharNumberPattern = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

    if (!phoneNumber.match(phoneNumberPattern)) {
        return res.status(400).json({
            status: 'error',
            message: "Enter valid phone number"
        });
    }

    if (!aadharNumber.match(aadharNumberPattern)) {
        return res.status(400).json({
            status: 'error',
            message: "Enter valid aadhar number"
        });
    }
    try {
        // Check if user exists in users table
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExist.rows.length === 0) {
            return res.status(401).json({
                status: 401,
                message: "Wrong credentials"
            });
        }

        // Check if KYC already exists for the user
        const kycUserExist = await pool.query("SELECT * FROM user_kyc_details WHERE email = $1", [email]);
        if (kycUserExist.rows.length > 0) {
            return res.status(401).json({
                status: 401,
                message: "Email already exists in KYC records"
            });
        }

        // Insert data into user_kyc_details table
       const kycUser= await pool.query(
            "INSERT INTO user_kyc_details (name, email, phone_number, aadhar_number,user_id) VALUES ($1, $2, $3, $4,$5) RETURNING *",
            [filteredBody.fullName, filteredBody.email, filteredBody.phoneNumber, filteredBody.aadharNumber,userId]
        );         
        
        // Successful insertion response
        res.status(200).json({
            status: 'success',
            message: "KYC under processing"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: "Something went wrong",
            error: error.message
        });
    }

}); 

exports.verifiedUser=asyncHandler(async(req,res)=>{
    const {status,user_id} = req.body;

    const updateKyc_Is_verified=await pool.query("UPDATE user_kyc_details SET is_verified = $1 WHERE user_id = $2",[status,user_id])
    const updateUsers_Is_verified=await pool.query("UPDATE users SET is_verified = $1 WHERE id = $2",[status,user_id])
    const user = await pool.query("Select * from users where id=$1",[user_id])

    const role = user.rows[0].role;
    const verificationStatus = user.rows[0].is_verified;
    res.status(200).json({
        status:'success',
        message:'Entered in dashboard',role,verificationStatus
    })
})

exports.updateKyc=asyncHandler(async(req,res)=>{
    const {fullName,phoneNumber,aadharNumber,userId}=req.body;
    const filteredBody = filterObj(req.body, "fullName", "phoneNumber", "aadharNumber");

    // Validate phone number and Aadhar number
    const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const aadharNumberPattern = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

    if (!phoneNumber.match(phoneNumberPattern)) {
        return res.status(400).json({
            status: 'error',
            message: "Enter valid phone number"
        });
    }

    if (!aadharNumber.match(aadharNumberPattern)) {
        return res.status(400).json({
            status: 'error',
            message: "Enter valid aadhar number"
        });
    }

    try {
        const updateKyc=await pool.query("UPDATE user_kyc_details SET name = $1,phone_number=$2,aadhar_number=$3,is_verified=$4 WHERE user_id = $5",[filteredBody.fullName,filteredBody.phoneNumber,filteredBody.aadharNumber,'pending',userId])
        const updateUser=await pool.query("UPDATE users SET is_verified = $1 WHERE id = $2",['pending',userId])

        const user = await pool.query("Select * from users where id=$1",[userId])

    const verificationStatus = user.rows[0].is_verified;
        res.status(200).json({
            status: 'success',
            message: "KYC under processing",verificationStatus
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: "Something went wrong",
            error: error.message
        });
    }
})