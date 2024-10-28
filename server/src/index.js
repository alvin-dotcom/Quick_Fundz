require('dotenv').config({path:'./.env'});

const app = require("./app.js");
const connectPostgresDB = require('./db/index.js');

app.get('/',(req,res)=>{
    res.send('Hii')
})

connectPostgresDB()
    .then((pool) => {
        app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://139.84.209.255:${PORT}`);
});
    })
    .catch((err) => {
        console.log("PostgreSQL connection failed !!!", err);
    });
    
