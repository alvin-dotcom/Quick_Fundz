const connectPostgresDB = require("../db/index");
const asyncHandler = require("../utils/asyncHandler");

let pool;
(async () => {
    pool = await connectPostgresDB();
})();


exports.createInvestment = asyncHandler(async (req, res,next ) => {
    
    const { userId } = req; 
    const { amount, duration, interestRate } = req.body;
    try {
        const user = await pool.query("Select * from users where id=$1",[userId])
        const kycUser = await pool.query("Select * from user_kyc_details where user_id=$1",[userId])
        const name = kycUser.rows[0].name;
        const email = user.rows[0].email;
        const newInvestment = await pool.query(
            "INSERT INTO investor_details (name,email,amount, duration, rate_of_interest, user_id) VALUES ($1, $2, $3, $4 , $5 , $6) RETURNING *",
            [name , email,amount, duration, interestRate, userId]
        );
        const updateUsersInvestorUser_id= await pool.query("Update users set investor_usersuser_id=$1 where id=$2",[userId,userId])

        res.status(201).json({
            status: 'success',
            message: 'Investment created successfully',
            data: newInvestment.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error saving investment data',
            error: error.message,
        });
    }
});

exports.getAllInvestments = asyncHandler(async (req, res) => {
    const {userId} = req;
    try {
        const investments = await pool.query(
            "SELECT * FROM investor_details WHERE invest_status = $1 AND user_id != $2",['provider',userId] 
        );
        res.status(200).json({
            status: "success",
            data: investments.rows,
        });
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({
            status: "error",
            message: "Error fetching investments",
            error: error.message,
        });
    }
});

