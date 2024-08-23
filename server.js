const app = require("./src/app");
// Assuming you have a reference to the database connection
const mongoose = require("mongoose");
const {
  app: { port: PORT },
} = require("./src/Configs/config.mongodb");

// Function to close the database connection
function closeDatabaseConnection() {
  return mongoose.connection.close();
}

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce started on port ${PORT}`);
});

process.on("SIGINT", () => {
  // Close the server
  server.close(() => {
    console.log("WSV eCommerce server stopped");

    // Close the database connection
    closeDatabaseConnection()
      .then(() => {
        console.log("Database connection closed");
        process.exit(0);
      })
      .catch((error) => {
        console.error("Error closing database connection", error);
        process.exit(1);
      });
  });
});
