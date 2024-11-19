import mongoose from "mongoose";
import Email from "mongoose-type-email";

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
        unique: true,
    },

    password:{
        type:String,
        required: true,
    }

}, {timestamps: true})

const User = mongoose.model("user", userSchema)

export default User