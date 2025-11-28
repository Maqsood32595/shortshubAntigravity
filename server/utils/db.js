const connectDB = require('./db-mongo');
const { User, Video } = require('../db/models');

// Connect to MongoDB
connectDB();

module.exports = {
    // User methods
    createUser: async (userData) => {
        const user = await User.create(userData);
        return { ...user.toObject(), id: user._id.toString() };
    },

    findUserByEmail: async (email) => {
        const user = await User.findOne({ email });
        return user ? { ...user.toObject(), id: user._id.toString() } : null;
    },

    findUserById: async (id) => {
        const user = await User.findById(id);
        return user ? { ...user.toObject(), id: user._id.toString() } : null;
    },

    // Video methods
    createVideo: async (videoData) => {
        // Map userId to user field expected by Mongoose schema
        const { userId, ...rest } = videoData;
        const video = await Video.create({ ...rest, user: userId });
        return { ...video.toObject(), id: video._id.toString() };
    },

    getVideos: async () => {
        const videos = await Video.find().sort({ createdAt: -1 }).populate('user', 'name');
        return videos.map(v => ({
            ...v.toObject(),
            id: v._id.toString(),
            author: v.user ? v.user.name : 'Unknown'
        }));
    },

    getUserVideos: async (userId) => {
        const videos = await Video.find({ user: userId }).sort({ createdAt: -1 });
        return videos.map(v => ({
            ...v.toObject(),
            id: v._id.toString()
        }));
    }
};
