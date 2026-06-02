import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';


// Stores all notifications sent to users or admins.
const notificationSchema = mongoose.Schema({
      user:{
            type:ObjectId,
            ref: 'user'
      },
      recipient:{
            type:ObjectId,
            ref: 'user'
      },
      transaction:{
            type:ObjectId,
            ref: 'transaction'
      },
    
    message:{
            type:String,
      },

      // in case of transaction
    sender_message:{
            type:String,
      },
    recipient_message:{
            type:String,
      },

      regDate:{
            type:String,
      },
      
})


const Notification = mongoose.model('notification',notificationSchema)
export default Notification;