import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: "/userImgs/cute8.webp",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    profilePic: "/userImgs/cute23.webp",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
    profilePic: "/userImgs/cute24.webp",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "123456",
    profilePic: "/userImgs/cute25.webp",
  },
  // Male Users
  {
    email: "shanks@gmail.com",
    fullName: "Akagami Shanks",
    password: "123456",
    profilePic: "/userImgs/shanks.webp",
  },
  {
    email: "boa@example.com",
    fullName: "Boa Hancock",
    password: "123456",
    profilePic: "/userImgs/boa.webp",
  },
  {
    email: "Zoro",
    fullName: "Roronoa Zoro",
    password: "123456",
    profilePic: "/userImgs/Zoro.webp",
  },
  {
    email: "ace@example.com",
    fullName: "Portgas D Ace",
    password: "123456",
    profilePic: "/userImgs/ace.webp",
  },
  {
    email: "Yamato@gmail.com",
    fullName: "Yamoto",
    password: "123456",
    profilePic: "/userImgs/Yamato.webp",
  },
  {
    email: "levi@gmail.com",
    fullName: "Levi",
    password: "123456",
    profilePic: "/userImgs/levi.webp",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();