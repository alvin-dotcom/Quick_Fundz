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
        `SELECT * FROM user_kyc_details`
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching KYC details:', error);
      res.status(500).json({ message: 'Error fetching KYC details' });
    }
  };

  exports.adminUpdateKycUser=asyncHandler(async(req,res)=>{
    const {userId,userID} = req.body;
try {
      const updateKycUser= await pool.query('Update user_kyc_details set user_id = NULL where id=$1',[userId])
      const updateUserKyc= await pool.query('Update users set kyc_usersuser_id=NULL where id=$1',[userID])
} catch (error) {
  console.log(error)
}  })

exports.getAllUsers=asyncHandler(async(req,res)=>{

  try {
    const allUser = await pool.query('Select * from users ')
    res.status(200).json(allUser.rows)
  } catch (error) {
    console.error('Error fetching User details:', error);
      res.status(500).json({ message: 'Error fetching User details' });
  }
});

exports.adminUpdateUser=asyncHandler(async(req,res)=>{
  const {userId,inputValue}=req.body;

try {
    const updateUser = await pool.query("Update users set message=$1 where id=$2",[inputValue,userId])
  
} catch (error) {
  console.log(error)
}})
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

exports.adminMessage=asyncHandler(async(req, res)=>{
  const {userId} = req;
  try {
    const message = await pool.query('Select message from users where id=$1',[userId])

    res.status(200).json(message.rows[0].message);
  } catch (error) {
    console.log(error)
  }
})

/* exports.adminMessageDelete=asyncHandler(async(req, res)=>{
  const {userId} = req;
  try {
    const deleteMessage = await pool.query("Update users set message=NULL where id=$1",[userId])
  } catch (error) {
    console.log(error)
  }
}) */

  exports.allInvestorDetails=asyncHandler(async(req, res)=>{
    try {
      const allInvestor = await pool.query('Select * from investor_details ')
      res.status(200).json(allInvestor.rows)
    } catch (error) {
      console.error('Error fetching User details:', error);
        res.status(500).json({ message: 'Error fetching User details' });
    }
  })

  exports.allLoanRequest=asyncHandler(async(req,res)=>{
    try {
      const allLoanRequest = await pool.query('Select * from loan_request_details ')
      res.status(200).json(allLoanRequest.rows)
    } catch (error) {
      console.error('Error fetching User details:', error);
        res.status(500).json({ message: 'Error fetching User details' });
    }
  })

  exports.updateInvestorUser=asyncHandler(async(req,res)=>{
    const {userId , userID}= req.body;
    try {
      const UpdateInvestor = await pool.query('Update investor_details set user_id=NULL where id=$1',[userId])
      const updateInvestorUser= await pool.query('Update users set investor_usersuser_id=NULL where id=$1',[userID])
      
    } catch (error) {
      console.log(error);
    }
  })

  exports.updateLoanUser= asyncHandler(async(req,res)=>{
    const {userId,userID} = req.body;
    try {
      const UpdateLoanRequest = await pool.query('Update loan_request_details set user_id=NULL where id=$1',[userId])
      const updateLoanRequestUser= await pool.query('Update users set loan_usersuser_id=NULL where id=$1',[userID])
        } catch (error) {
      console.log(error)
    }
  })