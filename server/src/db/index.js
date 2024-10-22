const { Pool } = require('pg');

const connectPostgresDB = async () => {
    try {
        // Create a new pool instance with your PostgreSQL configuration
        const pool = new Pool({
            
            user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
        });

        // Test the connection
        const client = await pool.connect();
        console.log(`\n PostgreSQL connected! DB HOST: ${client.host}`);
        client.release(); // Release the client after use

        return pool; // Return the pool instance to be used elsewhere
    } catch (error) {
        console.log("PostgreSQL connection FAILED", error);
        process.exit(1); // Exit with failure code
    }
};

module.exports = connectPostgresDB;
















/* const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool; */