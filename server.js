import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); // Allow all origins for debugging
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Database Connection Payload
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates for Aiven
    }
};

let pool;

async function initializeDatabase() {
    try {
        pool = mysql.createPool(dbConfig);
        console.log("Connected to the database");

        // Validate table exists or create it
        // Validate table exists or create it
        const connection = await pool.getConnection(); // Get connection from pool
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                access_key VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Attempt to add 'username' column if it doesn't exist (for existing tables)
        try {
            await connection.query("ALTER TABLE users ADD COLUMN username VARCHAR(255)");
            console.log("Added 'username' column to users table");
        } catch (err) {
            // Ignore error if column already exists
            if (err.code !== 'ER_DUP_FIELDNAME') {
                console.log("Column check skipped or failed:", err.message);
            }
        }

        // Attempt to add 'access_key' column if it doesn't exist
        try {
            await connection.query("ALTER TABLE users ADD COLUMN access_key VARCHAR(255)");
            console.log("Added 'access_key' column to users table");
        } catch (err) {
            // Ignore error if column already exists
            if (err.code !== 'ER_DUP_FIELDNAME') {
                console.log("Column check skipped or failed:", err.message);
            }
        }

        console.log("Users table verified/created");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

// initializeDatabase call moved to bottom conditional block

// Routes
app.post('/api/register', async (req, res) => {
    console.log("Register Request Received:", req.body); // DEBUG LOG
    const { username, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const accessKey = crypto.randomBytes(20).toString('hex'); // Generate random access key

        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password, access_key) VALUES (?, ?, ?, ?)',
            [username || null, email, hashedPassword, accessKey]
        );

        res.status(201).json({ message: "User registered successfully", accessKey });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: { id: user.id, username: user.username, email: user.email, accessKey: user.access_key }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});

// Export app for Vercel
module.exports = app;

// Only listen if run directly (not imported)
if (require.main === module) {
    initializeDatabase().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
} else {
    // For Vercel, we still need to init DB but probably lazily or just call it. 
    // Vercel serverless environment might reuse containers.
    initializeDatabase();
} // redeploy trigger
