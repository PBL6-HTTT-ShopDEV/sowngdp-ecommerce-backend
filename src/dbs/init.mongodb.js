'use strict'

const mongoose = require('mongoose');
// const { db: { protocol, username, password, dbName } } = require('../configs/config.mongodb');
// const connectString = `${protocol}://${username}:${password}@${dbName}.ikjhbp3.mongodb.net/?retryWrites=true&w=majority`;
// Sown code is replaced by the following code:
const {
    db: { host, name, port },
  } = require("../configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;

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