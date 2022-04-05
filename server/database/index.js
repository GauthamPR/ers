const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    publicAddress: String,
    nonce: String,
    permissions: [String]
})

const Users = mongoose.model("Users", UserSchema);

module.exports = {
    Users
}