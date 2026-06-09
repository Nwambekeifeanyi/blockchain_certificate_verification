import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = mongoose.Schema({
      full_name:{
            type:String,
      },
     
    email:{
            type:String,
      },
   

    password:{
            type:String,
      },

   

      regDate:{
            type:String,
      },
      
})

adminSchema.pre('save', async function (next) {
      // ONLY hash the password if it is new or being updated
      if (!this.isModified('password')) {
            return next();
      }

      try {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
            next();
      } catch (error) {
            next(error);
      }
});

// adminSchema.statics.login = async function(adminSchemaName,password) {
adminSchema.statics.login = async function (email, password) {
      const admin = await Admin.findOne({ email })
      if (admin) {
            const auth = await bcrypt.compare(password, admin.password);

            console.log(auth);
            if (auth) {
                  return admin
            } else {

                  // 'incorrect password'
                  throw new Error('Invalid credentials. Please check your email and password.');
            }
      } else {
            throw new Error('Invalid credentials. Please check your email and password.');

      }
}


const Admin = mongoose.model('admin', adminSchema)
export default Admin;