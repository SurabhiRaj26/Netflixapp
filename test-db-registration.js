
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false,
    }
};

async function testRegistration() {
    console.log("1. Testing Database Connection...");
    console.log(`   Host: ${dbConfig.host}`);

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log("   ✅ Connection Successful!");
    } catch (error) {
        console.error("   ❌ Connection Failed:", error.message);
        return;
    }

    console.log("\n2. Testing User Registration Logic...");
    const testUser = {
        username: "TestRunner_" + Math.floor(Math.random() * 1000),
        email: `test_${Date.now()}@example.com`,
        password: "password123"
    };

    try {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const accessKey = crypto.randomBytes(20).toString('hex');

        console.log(`   Attempting to insert user: ${testUser.username} (${testUser.email})`);

        const [result] = await connection.execute(
            'INSERT INTO users (username, email, password, access_key) VALUES (?, ?, ?, ?)',
            [testUser.username, testUser.email, hashedPassword, accessKey]
        );

        console.log("   ✅ Registration Successful!");
        console.log("   Insert ID:", result.insertId);

    } catch (error) {
        console.error("   ❌ Registration Failed:", error.message);
        if (error.code) console.error("   Error Code:", error.code);
    } finally {
        await connection.end();
    }
}

testRegistration();
