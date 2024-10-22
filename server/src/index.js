require('dotenv').config({path:'./.env'});

const app = require("./app.js");
const connectPostgresDB = require('./db/index.js');

app.get('/',(req,res)=>{
    res.send('Hii')
})

connectPostgresDB()
    .then((pool) => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("PostgreSQL connection failed !!!", err);
    });
    
