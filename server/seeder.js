import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Tape from "./models/Tape.js";
import Trade from "./models/Trade.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Tape.deleteMany();
    await Trade.deleteMany();
    console.log("💥 Existing data cleared");

    // Create test users
    const user1 = await User.create({
      username: "test",
      email: "test@test.com",
      password: "test123",
    });

    const user2 = await User.create({
      username: "alice",
      email: "alice@test.com",
      password: "alice123",
    });

    // List of demo tapes
    const tapesData = [
      { name: "Demo Tape", artist: "Demo Artist", genre: "Experimental", releaseDate: "2020-01-01", fileUrl: "/uploads/demo.mp3" },
      { name: "Sunset Vibes", artist: "Chill Beats", genre: "Lo-Fi", releaseDate: "2019-05-20", fileUrl: "/uploads/sunset.mp3" },
      { name: "Midnight Jazz", artist: "Smooth Cats", genre: "Jazz", releaseDate: "2018-09-10", fileUrl: "/uploads/midnight.mp3" },
      { name: "Rock On", artist: "The Strummers", genre: "Rock", releaseDate: "2021-03-15", fileUrl: "/uploads/rockon.mp3" },
      { name: "Pop Parade", artist: "Bubble Pop", genre: "Pop", releaseDate: "2022-07-22", fileUrl: "/uploads/popparade.mp3" },
      { name: "Classical Calm", artist: "Orchestra Uno", genre: "Classical", releaseDate: "2017-11-05", fileUrl: "/uploads/classical.mp3" },
      { name: "Hip Hop Beats", artist: "MC Flow", genre: "Hip Hop", releaseDate: "2020-06-18", fileUrl: "/uploads/hiphop.mp3" },
      { name: "Electronic Dreams", artist: "DJ Pulse", genre: "Electronic", releaseDate: "2019-08-30", fileUrl: "/uploads/electronic.mp3" },
      { name: "Country Roads", artist: "The Wanderers", genre: "Country", releaseDate: "2021-02-12", fileUrl: "/uploads/country.mp3" },
    ];

    // Create tapes
    const createdTapes = await Tape.insertMany(tapesData);

    console.log("✅ Data seeded successfully with 2 users and assigned tapes!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
