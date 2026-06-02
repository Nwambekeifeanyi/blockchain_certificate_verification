import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = mongoose.Schema({
      first_name:{
            type:String,
      },
      last_name:{
            type:String,
      },
    email:{
            type:String,
      },
    contact:{
            type:String,
      },

    password:{
            type:String,
      },

    role:{
            type:String,
            default: 'admin'

      },


      // auto assigned

      active:{
            type:Boolean,
            default:true

      },
      
      profile:{
            type:String,
            default:'profile3.png'
      },

      regDate:{
            type:String,
      },
      
})

adminSchema.pre('save', async function (next) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
    })
adminSchema.statics.login = async function(email,password){
      const admin = await Admin.findOne({email})

      if (admin) {
          const auth = await bcrypt.compare(password, admin.password)  
          if (auth) {
            return admin
          }
          throw new Error('incorrect password')
      }
      throw new Error('this username does not exist')
}
const Admin = mongoose.model('admins',adminSchema)
export default Admin;