import { validateEmail,validateMobile } from "../common/validation.js";
import mongoose from "./index.js";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    phone:{
        type: String,
        required: [true, "Phone No. is required"],
        validate: {
            validator: validateMobile,
            message: props => `${props.value} is not a valid phone number`
        }
    },
    resetToken:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        collection: 'user',
        versionKey: false
    }
)

const userModel = new mongoose.model('user',userSchema)

export default userModel