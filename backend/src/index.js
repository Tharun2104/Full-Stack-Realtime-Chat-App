import  express from "express";
import  dotenv, { config } from "dotenv";
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


dotenv.config()

// Creating a Expresss app
const app = express();  

const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser());  // important to use cookie parser

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT)
    connectDB()
});
