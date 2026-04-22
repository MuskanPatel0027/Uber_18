const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

// Initialize Socket.IO
function initializeSocket(server) {
    io = socketIo(server, {
        cors: { 
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', async ({ userId, role }) => {
            console.log(`User ${userId} with role ${role} joined socket room: ${socket.id}`);
            socket.join(socket.id); // Join a room with the socket ID
            // Optionally, you can store the mapping of userId to socket.id in memory or a database for later use
        try {
            if (role === 'user') {
                const user = await user 
                    .findById(userId)
                    .select('fullname email')
                    .lean();    
                if (user) {
                    console.log('User data for socket:', user);
                    io.to(socket.id).emit('userData', { user });
                } else {
                    console.error('User not found for socket:', userId);
                }   
            } else if (role === 'captain') {
                const captain = await captainModel
                    .findById(userId)
                    .select('fullname email vehicle')
                    .lean();    
                if (captain) {
                    console.log('Captain data for socket:', captain);
                    io.to(socket.id).emit('captainData', { captain });
                } else {
                    console.error('Captain not found for socket:', userId);
                }
            } else {
                console.error('Invalid role for socket:', role);
            }
        } catch (err) {
            console.error('Error fetching data for socket:', err);
        }
            
        });

        socket.on('update-location-captain',    async ({ captainId, location }) => {
            console.log(`Received location update from captain ${captainId}:`, location);
            // Broadcast the location update to all users (or you can target specific users)
            io.emit('captain-location-update', { captainId, location });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

// Send message to specific socket ID
function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit('message', messageObject.event);
    } else {
        console.error('Socket.io not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
