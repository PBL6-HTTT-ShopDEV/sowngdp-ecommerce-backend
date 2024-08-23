"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../Configs/config.mongodb");
const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }

  // Connect to MongoDB
  async connect(type = "mongodb") {
    try {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
      await mongoose.connect(connectString, {
        maxPoolSize: 50,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
    }
  }

  // Get Instance
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
