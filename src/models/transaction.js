import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

// Stores all banking transactions.
const transactionSchema = mongoose.Schema({
      user:{
            type:ObjectId,
            ref: 'user'
      },
      transaction_type:{ //"deposit", "withdrawal", "transfer", "bill_payment"
            type:String,
      },
    amount:{
            type:Number,
            default:0,
      },

    recipient:{
            type:ObjectId,
            ref: 'user'
      },

    status:{ //"pending", "successful", "failed", "flagged"
            type:String,
      },

    reason:{
            type:String,

      },


      regDate:{
            type:String,
      },
      
})


const Transaction = mongoose.model('transaction',transactionSchema)
export default Transaction;