import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { regDate, time, today } from "../middlewares/date.js";
import User from "../models/user.js";
import Login_attempt from "../models/login_attempt.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";



export default {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let passwordRegex =
        /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,}$/;

      if (!emailRegex.test(email)) {
        throw Error("invalid username");
      }
      if (!passwordRegex.test(password)) {
        throw Error("invalid password and it must be greater than 3");
      }

      const admin = await Admin.login(email, password);
      console.log(admin);
      const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET);
      console.log(token);
      res.cookie("jwt", token, { maxAge: 5000 * 60 * 60 });
      return res.status(200).json({ success: "login successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  adminRegistration: async (req, res) => {
    try {
      const { 
        first_name,
        last_name,
        email,
        contact,
        password,
       } = req.body;
      console.log(req.body);

      // ===================== check already registered ==========================
      const isRegistered = await Admin.findOne({ email: email });

      if (isRegistered) {
        throw Error('this user is already resgistered')
      }

      

      const registeredAdmin = await Admin.create({
       first_name,
       last_name,
        email,
        contact,
        password,
        regDate,
      });

      console.log(registeredAdmin);
      

      return res.status(200).json({
        success: "registration successful",
      });
    }  catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  userRegistration: async (req, res) => {
    try {
      const { 
        first_name,
        last_name,
        email,
        contact,
        password,
       } = req.body;
      console.log(req.body);

//  regDate = `${regDate}|${time}`
// console.log(regDate);

      // ===================== check already registered ==========================
      const isRegistered = await User.findOne({ email: email });
      if (isRegistered) {
        throw new Error('this user is already resgistered')
      }

                 
// throw new Error()
      const registeredUser = await User.create({
      full_name,
        email,
        contact,
        password,
        status: 'client',
        regDate: `${regDate}|${time}`,
      });

     
      
      return res.status(200).json({
        success: "registration successful",
      });
    }  catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const thisUser = await User.findOne({ email: email });


      
      

      let auth;
     if(thisUser)  auth = await bcrypt.compare(password, thisUser.password);
      

      const deviceName = req.headers['user-agent']
      

      
      console.log(req.body);
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let passwordRegex =
        /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;

      
        const today_failed_login = await Login_attempt.find({user: thisUser._id, today: today, status: 'failed'})
        // console.log(today_failed_login);

        if (today_failed_login.length > 2) throw new Error("Your account is blocked due to many failed login attempt")
          

        if (!auth) {


      // throw new Error()
         const loginTime = `${regDate}|${time}`;
        const create_login = await Login_attempt.create({
          user: thisUser._id,
          status: 'failed',
          message: `A failed login attempt was detected on your account from device ${deviceName} at ${loginTime}. If this was not you, please secure your account immediately.`,
          today,
          regDate: loginTime
        });
          
        }
      const user = await User.login(email, password);
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      res.cookie("jwt", token, { maxAge: 5000 * 60 * 60 });


      if (user) {
        const loginTime = `${regDate}|${time}`;
        const create_login = await Login_attempt.create({
          user: user._id,
          status: 'successful',
          message: `Login successful from device ${deviceName} at ${loginTime}. If this was not you, please change your password immediately and contact support.`,
          today,
          regDate: loginTime
        });
      }
      return res.status(200).json({ success: "login successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  AdminLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/admin/login");
  },
  userLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/");
  },

};
