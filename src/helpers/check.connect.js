"use strict"; // eslint-disable-line

const mongoose = require("mongoose");
const _SECOND = 5000;
const os = require("os");
const process = require("process");
// Count connections
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log("Number of connections:", numConnection);
};

// Check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Example maximum 5 connections per core
    const maxConnection = 5 * numCore;

    console.log("Active connections:", numConnection);
    console.log("Memory usage:", memoryUsage / 1024 / 1024, "MB");

    if (numConnection > maxConnection) {
      console.log("Overload connections");
    }
  }, _SECOND); // Monitor every 5 seconds
};
module.exports = {
  countConnect,
  checkOverLoad,
};
