require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@'));
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000
        });
        console.log('✅ Connection successful!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        console.error('Hostname:', error.hostname);
        process.exit(1);
    }
}

testConnection();
