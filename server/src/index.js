require('dotenv').config({path:'./.env'});
const crypto = require('crypto');
const {Cashfree} = require('cashfree-pg')
const app = require("./app.js");
const connectPostgresDB = require('./db/index.js');


Cashfree.XClientId = process.env.CLIENT_ID
    Cashfree.XClientSecret = process.env.CLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId(){
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');
    return orderId.substring(0,12);
}

app.get('/',(req,res)=>{
    res.send('Hii')
})

app.get('/payment', async(req, res)=>{
    try {
        var request = {
            "order_amount": "1",
            "order_currency": "INR",
            "order_id":await generateOrderId(),
            "customer_details": {
              "customer_id": "node_sdk_test",
              "customer_name": "",
              "customer_email": "example@gmail.com",
              "customer_phone": "9999999999"
            },
        }

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating order:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to create order", details: error.response?.data });
    }
})

app.post('/verify', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: "Missing orderId" });
    }

    try {
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        if (!response.data) {
            return res.status(404).json({ error: "Order not found" });
        }
       
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error verifying order:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to verify order", details: error.response?.data });
    }
});


connectPostgresDB()
    .then((pool) => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("PostgreSQL connection failed !!!", err);
    });
    
