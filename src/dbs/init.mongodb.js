'use strict'

const mongoose = require('mongoose');
const { db: { protocol, username, password, dbName } } = require('../configs/config.mongodb');
let user_name = encodeURIComponent(username);
let pass_word = encodeURIComponent(password);
console.log(user_name)
console.log(pass_word)
console.log(dbName)
const connectString = `${protocol}://${user_name}:${pass_word}@${dbName}.5ixeh.mongodb.net/tour-booking?retryWrites=true&w=majority&ssl=true&appName=Tour-booking`;

class Database {
    constructor() {
        this.connect();
    };

    connect() {
        mongoose.connect(connectString)
            .then( _ => {
                console.log(`Connected Mongodb Success!`);
            })
            .catch( err => {
                console.log(`Error connect!: ${err}`);
            } )
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