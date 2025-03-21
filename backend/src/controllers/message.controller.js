import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// fetching all the users to display on left side to chat
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // fetch the loggedin user id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // fetch all the users except the logged in user, ne is not equals to

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// fetching all the messages of the person who ur going to chat
export const getMessages = async (req, res) => {
    try {
    const { id:userToChatId} = req.params; // user to chat ID 
    const myId = req.user._id;        // my id or sender id

    const messages = await Message.find({
        $or: [
            { senderId:myId, receiverId:userToChatId },
            { senderId:userToChatId, receiverId:myId }
        ]
    })

    res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// user to send message ( text or images )
export const sendMessage = async (req, res) => {
    try {
        const {text , image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
          // Upload base64 image to cloudinary
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }

        // create the message
        const newMessage = new Message({
            senderId,
            receiverId,  // equals to receiverId: receiverId
            text,
            image: imageUrl,
        });

        // save the message to the db
        await newMessage.save();

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage); // 201 - new message has been created

    } catch ({error}) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};