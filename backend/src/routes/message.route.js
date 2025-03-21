import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import  { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js"

const router = express.Router();

// adding endpoints

// fetching all the users to the left side bar
router.get("/users", protectRoute, getUsersForSidebar);

// opening the chat of other user
router.get("/:id", protectRoute, getMessages);

// send messages endpoint
router.post("/send/:id", protectRoute, sendMessage);


export default router;