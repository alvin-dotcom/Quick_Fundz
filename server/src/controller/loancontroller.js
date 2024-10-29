const connectPostgresDB = require("../db/index");
const asyncHandler = require("../utils/asyncHandler")
const filterObj = require("../utils/filterObj")

let pool;
(async () => {
    pool = await connectPostgresDB();
})();

exports.requestLoan=asyncHandler(async(req,res)=>{
    const {userId,loanAmount,loanDuration,loanUserId,loanInterestRate,investorEmail,investorUserId,status,investorAmount,investorDuration,investorRate}=req.body;
    const filteredBody = filterObj(req.body, 'loanAmount','loanDuration','loanUserId','loanInterestRate','investorEmail','investorUserId','status','investorAmount','investorDuration','investorRate');
    const user=await pool.query("Select * from users where id=$1",[loanUserId])
    const kycUser = await pool.query("Select * from user_kyc_details where user_id=$1",[loanUserId])
    const name=kycUser.rows[0].name;
    const email=user.rows[0].email;
    const investorStatus= await pool.query("UPDATE investor_details SET invest_status = $1 WHERE id = $2",[status,userId]);
    const loanRequest = await pool.query(
        "INSERT INTO loan_request_details (name, loan_amount, duration, user_id, rate_of_interest, email, investor_email, investoruser_id, original_amount, original_duration, original_rate_of_interest,investor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)",
        [name,filteredBody.loanAmount,filteredBody.loanDuration,filteredBody.loanUserId,filteredBody.loanInterestRate,email, filteredBody.investorEmail, filteredBody.investorUserId, filteredBody.investorAmount, filteredBody.investorDuration, filteredBody.investorRate,userId]
    );
})

exports.requestInvestor=asyncHandler(async(req,res)=>{
    const {investorUserId}=req.body;

    const userLoanRequest=await pool.query("SELECT * from loan_request_details where investoruser_id=$1 AND state!=$2 ",[investorUserId,'Rejected'])
     
    const loanTaker=userLoanRequest.rows
    //const loan_status=userLoanRequest.rows[0].state;
    
    res.status(200).json({
        loanTaker
    }) 
})

exports.rejectedLoan=asyncHandler(async(req,res)=>{
    const {status,userId,loanId}=req.body;
    const updateLoanRequest=await pool.query("UPDATE loan_request_details SET state=$1 where id=$2 ",[status,loanId])
    const updateInvestor=await pool.query("Update investor_details Set invest_status=$1 where id=$2",['provider',userId])
    
})

exports.acceptLoan=asyncHandler(async(req,res)=>{
    const {status,userId,loanId}=req.body;
    const updateLoanRequest=await pool.query("UPDATE loan_request_details SET state=$1 where id=$2 ",[status,loanId])
    const updateInvestor=await pool.query("Update investor_details Set invest_status=$1 where id=$2",['paid',userId])
});

exports.lastNegotiate=asyncHandler(async(req,res)=>{
    const {investor_email,investoruser_id,negotiateAmount,negotiateDuration,negotiateInterestRate,loan_amount,loan_duration,loanInterestRate,loanUserId,loanId}=req.body;
    const filteredBody=filterObj(req.body, 'investor_email','investoruser_id','negotiateAmount','negotiateDuration','negotiateInterestRate','loan_amount','loan_duration','loanInterestRate','loanUserId','loanId')
    const kycUser = await pool.query("SELECT * FROM user_kyc_details where user_id=$1",[investoruser_id])
    const name = kycUser.rows[0].name;
    const insertNegotiateRequest = await pool.query("INSERT INTO investor_negotiation (name,email,user_id,negotiate_amount,negotiate_duration,negotiate_rate_of_interest,loan_amount,loan_duration,loan_rate_of_interest,loan_user_id,loan_id) Values($1,$2,$3 ,$4,$5,$6,$7,$8,$9,$10,$11)",[name,filteredBody.investor_email,filteredBody.investoruser_id,filteredBody.negotiateAmount,filteredBody.negotiateDuration,filteredBody.negotiateInterestRate,filteredBody.loan_amount,filteredBody.loan_duration,filteredBody.loanInterestRate,filteredBody.loanUserId,filteredBody.loanId])
})

exports.paidStatus=asyncHandler(async(req,res)=>{
    const {investorId,status}=req.body;
try {
    const updateInvestorStatus = await pool.query('Update investor_details set invest_status=$1 where id=$2',[status,investorId])
} catch (error) {
    console.log(error);
}
})