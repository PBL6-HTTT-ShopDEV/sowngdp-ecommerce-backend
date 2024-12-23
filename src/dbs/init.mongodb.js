'use strict'

const mongoose = require('mongoose');
require('dotenv').config();

// Lấy trực tiếp từ process.env thay vì qua config
const username = process.env.DEV_DB_USERNAME;
const password = process.env.DEV_DB_PASSWORD;
const dbName = process.env.DEV_DB_NAME;

console.log('MongoDB Config:', { 
    username: username,
    dbName: dbName 
});

const connectString = `mongodb+srv://${username}:${password}@${dbName}.hcbzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connection String:', connectString.replace(password, '****'));

class Database {
    constructor() {
        this.connect();
    };

    connect() {
        mongoose.connect(connectString)
            .then(_ => {
                console.log(`Connected Mongodb Success!`);
            })
            .catch(err => {
                console.log(`Error connect!:`, err);
            })
    };

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        };
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;