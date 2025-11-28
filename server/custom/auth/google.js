module.exports = async (req, res) => {
    return { success: true, token: "google_jwt_token", user: { id: "user_123", name: "Google User" } };
};
