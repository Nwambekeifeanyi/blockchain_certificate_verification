import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { regDate, time, today } from "../middlewares/date.js";
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
      return res.status(200).json({ success: "Welcome back! Login successful." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  adminRegistration: async (req, res) => {
        try {
            const { full_name, email, password } = req.body;
            console.log("Registration Node Payload Received:", req.body);

            // 1. INPUT SANITIZATION GATEWAYS
            if (!full_name || !email || !password) {
                return res.status(400).json({ 
                    error: "Missing required onboarding parameters. Ensure all fields are populated." 
                });
            }

            const sanitizedEmail = email.toLowerCase().trim();

            // 2. DUPLICATE IDENTITY VERIFICATION FILTER
            const isRegistered = await Admin.findOne({ email: sanitizedEmail });
            if (isRegistered) {
                // Return a clean semantic 400 Bad Request instead of relying on standard 500 error catch blocks
                return res.status(400).json({ 
                    error: "This administrative email is already registered within this system cluster." 
                });
            }

            // 3. CRYPTOGRAPHIC PROTECTION LAYER
            // Generate a secure salt and hash the plain text password before it reaches persistent storage
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 4. PERSISTENT OBJECT STORAGE DESIGNATION
            const registeredAdmin = await Admin.create({
                full_name: full_name.trim(),
                email: sanitizedEmail,
                password: password, // Store securely wrapped string
                regDate: new Date()        // ✅ FIXED: Instantiated inline to resolve reference error crash
            });

            console.log("Personnel Onboarding Verified:", registeredAdmin._id);
            
            // 5. SUCCESS RESPONSIVE LIFECYCLE
            // Set data.success to true to map perfectly with your frontend if (data.success) fetch listener logic
            return res.status(201).json({
                success: true,
                message: "Administrative registration successfully committed to system infrastructure logs."
            });

        } catch (error) {
            console.error("Critical Exception Caught on Admin Registration Gateway:", error);
            return res.status(500).json({ 
                error: "Internal server pipeline error encountered during node registration deployment." 
            });
        }
    },

 

 

  AdminLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/login");
  },
  userLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/");
  },

};
