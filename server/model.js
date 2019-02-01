const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user', (err)=>{

    console.log("connected to Mongodb", err);
})

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required:[true, "Must have first name"]},
    last_name: {type: String, required:[true, "Must have last name"]},
    email: {type: String, required:[true, "Must have email address"]},
    password:{type: String, required:[true, "Must required Password"]}

})

module.exports = mongoose.model("User", UserSchema)