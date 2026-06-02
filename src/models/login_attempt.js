import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


// Stores every login attempt for security tracking.
const login_attemptSchema = mongoose.Schema({
      user:{
            type:ObjectId,
            ref: 'user'
      },

     
      status:{ // "fraud", "suspicious_login"
            type:String,
      },
    
    message:{
            type:String,
      },

       today:{
            type:String,
      },

      regDate:{
            type:String,
      },
      
})


const Login_attempt = mongoose.model('login_attempt',login_attemptSchema)
export default Login_attempt;