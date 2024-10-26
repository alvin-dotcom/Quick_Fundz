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
        const newInvestment = await pool.query(
            "INSERT INTO investments (amount, duration, interest_rate, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [amount, duration, interestRate, userId]
        );

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
    try {
        const investments = await pool.query(
            "SELECT amount, duration, interest_rate, user_id FROM investments"
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

