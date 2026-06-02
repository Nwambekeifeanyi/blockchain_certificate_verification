import User from "../models/user.js";
import bcrypt from "bcrypt";
export default {
      getHome: (req,res)=>{
            const context = {
          
            }
            res.render('./pageViews/home.ejs', {context});
      },
      getLogin: (req,res)=>{
            const context = {
          
            }
            res.render('./pageViews/login.ejs', {context});
      },
      getRegister: (req,res)=>{

            const context = {
          
            }
            
            res.render('./pageViews/register.ejs', {context})
      },
}

// export default pageCont;