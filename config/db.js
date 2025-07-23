// const mongoose = require('mongoose');

// const connectDB = async () => {
//   // try {
//   //   await mongoose.connect('mongodb+srv://Ahmed:GsP1rAUh3XZ3YlyT@aqueeb.megegyh.mongodb.net/?retryWrites=true&w=majority&appName=Aqueeb', {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true,
//   //   });
//   //   console.log('MongoDB connected');
//   // } catch (err) {
//   //   console.error('MongoDB connection error:', err.message);
//   //   process.exit(1);
//   // }

// };

const mongoose = require("mongoose");

// Replace with your actual MongoDB Atlas SRV connection string
const mongoURI = "mongodb+srv://Ahmed:test123@aqueeb.megegyh.mongodb.net/test";

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    await mongoose.connection.db.command({ ping: 1 });
    await mongoose.connection.db.command({ serverStatus: 1 });
    await mongoose.connection.db.command({ listCollections: 1 });
    await mongoose.connection.db.command({ isMaster: 1 });
    await mongoose.connection.db.command({ buildInfo: 1 });
    const users = await mongoose.model("User").find();
    console.log("Users data:", users);
    console.log("MongoDB connected successfully using SRV.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
}

// Optional: Event listeners for connection status
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error after initial connection:", err);
});
module.exports = connectDB;
