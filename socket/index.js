// Initialize the Socket.IO server on port 8800 with CORS configuration
const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000" // Define the allowed origin for CORS
    }
});

// Create an array to store active users
let activeUsers = []

// Event handler for when a client connects to the server
io.on("connection", (socket) => {

    // add new User
    socket.on('new-user-add', (newUserId) => {
        // Check if the user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            // Add the new user to the list of active users
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        // Log the list of connected users
        console.log("connected user", activeUsers);

        // Emit the list of active users to all connected clients
        io.emit('get-users', activeUsers);
    })

    // send message
    socket.on('send-message', (data) => {
        const { receiverId } = data;
        // Find the user to whom the message is sent
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("sending from socket to : ", receiverId);
        console.log('data', data);

        if (user) {
            // Emit the message to the specific user's socket
            io.to(user.socketId).emit("receive-message", data);
        }
    })

    // Event handler for when a client disconnects
    socket.on("disconnect", () => {
        // Remove the disconnected user from the list of active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);

        // Emit the updated list of active users to all connected clients
        io.emit('get-users', activeUsers);
    })
})