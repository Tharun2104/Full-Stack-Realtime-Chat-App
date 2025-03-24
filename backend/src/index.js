import  express from "express";
import  dotenv, { config } from "dotenv";
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import {app, server} from "./lib/socket.js"
import path from "path";


dotenv.config()

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser());  // important to use cookie parser
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//  for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT)
    connectDB()
});
