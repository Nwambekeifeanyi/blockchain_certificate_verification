import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const certificateSchema = mongoose.Schema({
      full_name:{
            type:String,
            default: "Unknown/Altered Input Layer"
      },
      matric_number:{
            type:String,
            default: "NOT_PROVIDED"
      },
    department:{
            type:String,
      },
    certificate:{
            type:String,
      },
    fileHash:{
            type:String,
      },



      regDate:{
            type:String,
      },
      
})


const Forgged = mongoose.model('forgged',certificateSchema)
export default Forgged;