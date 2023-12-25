 import { Schema , model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const userSchema = new Schema ({
  fullName: {
    type: String,  // <-- Corrected
    required: [true, "Name is required"],
    minLength: [5, "Name must be at least 5 Characters"],
    maxLength: [50, "Name should be less than 90 Characters"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,  // <-- Corrected
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
  },
  password: {
    type: String,  // <-- Corrected
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 Characters"],
    select: false,
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,  // <-- Corrected
    },
    secure_url: {
      type: String,  // <-- Corrected
    },
  },
  role: {
    type: String,  // <-- Corrected
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
}, { timestamps: true });


userSchema.pre('save', async function(next){
     if(!this.isModified('password')) {
        return next()
     }
     this.password = await bcrypt.hash(this.password,10)
})


userSchema.methods = {
    generateJWTToken: async function() {
        return await jwt.sign(
            {id: this._id, 
              email: this.email,
              subscription: this.subscription,
             role: this.role,
             },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    },

    comparePassword: async function(plainTextPassword) {
      return await bcrypt.compare(plainTextPassword,this.password)
    }
}

const User = model('User3', userSchema)

export default User



