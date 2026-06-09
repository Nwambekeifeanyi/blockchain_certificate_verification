import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const certificateSchema = mongoose.Schema({
      full_name:{
            type:String,
      },
      matric_number:{
            type:String,
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


const Certificate = mongoose.model('certificate',certificateSchema)
export default Certificate;