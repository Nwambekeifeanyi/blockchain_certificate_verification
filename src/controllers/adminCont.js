import User from "../models/user.js";
import Admin from "../models/admin.js";
import Transaction from "../models/transaction.js";
import Notification from "../models/notification.js";
import Alert from "../models/alert.js";
import Login_attempt from "../models/login_attempt.js";


import { regDate, time } from "../middlewares/date.js";
// import { Transaction } from "mongodb";

const adminCont = {
  getLogin: async (req, res) => {
    console.log(regDate);

    return res.render("./adminViews/login");
  },
  getRegistration: async (req, res) => {
    return res.render("./adminViews/register");
  },
  getDashboard: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    
    // const createdAccounts = await User.updateMany({password: '$2b$10$9bd/2e23O0S65AUJ.dFD6uXxbvq594fH6vLPtqU5Ent5CCgOcS6em'})
    // const createdAccounts = await User.updateMany({password: '$2b$10$/mpmbKeVr0HSONDcOliC4uB//WktQ7m.fmDPbhOzRHXETFDX.mYkq'})
    //     const createdAccounts = await User.insertMany([

    //   {
    //     full_name: "jane smith",
    //     account_number: "10503451502",
    //     email: "janesmith@email.com",
    //     contact: "09023454561",
    //     gender: "female",
    //     password: "09023454561",
    //     regDate: "14 Aug, 2025"
    //   },
    //   {
    //     full_name: "michael brown",
    //     account_number: "10503451503",
    //     email: "michaelbrown@email.com",
    //     contact: "09023454562",
    //     gender: "male",
    //     password: "09023454562",
    //     regDate: "25 Jun, 2025"
    //   },
    //   {
    //     full_name: "sarah johnson",
    //     account_number: "10503451504",
    //     email: "sarahjohnson@email.com",
    //     contact: "09023454563",
    //     gender: "female",
    //     password: "09023454563",
    //     regDate: "08 May, 2025"
    //   },
    //   {
    //     full_name: "peter williams",
    //     account_number: "10503451505",
    //     email: "peterwilliams@email.com",
    //     contact: "09023454564",
    //     gender: "male",
    //     password: "09023454564",
    //     regDate: "19 Mar, 2025"
    //   },
    //   {
    //     full_name: "linda davis",
    //     account_number: "10503451506",
    //     email: "lindadavis@email.com",
    //     contact: "09023454565",
    //     gender: "female",
    //     password: "09023454565",
    //     regDate: "03 Feb, 2025"
    //   },
    //   {
    //     full_name: "david clark",
    //     account_number: "10503451507",
    //     email: "davidclark@email.com",
    //     contact: "09023454566",
    //     gender: "male",
    //     password: "09023454566",
    //     regDate: "27 Jan, 2025"
    //   },
    //   {
    //     full_name: "emma thomas",
    //     account_number: "10503451508",
    //     email: "emmathomas@email.com",
    //     contact: "09023454567",
    //     gender: "female",
    //     password: "09023454567",
    //     regDate: "05 Sep, 2025"
    //   },
    //   {
    //     full_name: "daniel white",
    //     account_number: "10503451509",
    //     email: "danielwhite@email.com",
    //     contact: "09023454568",
    //     gender: "male",
    //     password: "09023454568",
    //     regDate: "11 Nov, 2025"
    //   },
    //   {
    //     full_name: "olivia martin",
    //     account_number: "10503451510",
    //     email: "oliviamartin@email.com",
    //     contact: "09023454569",
    //     gender: "female",
    //     password: "09023454569",
    //     regDate: "29 Oct, 2025"
    //   },
    //   {
    //     full_name: "william lee",
    //     account_number: "10503451511",
    //     email: "williamlee@email.com",
    //     contact: "09023454570",
    //     gender: "male",
    //     password: "09023454570",
    //     regDate: "16 Apr, 2025"
    //   },
    //   {
    //     full_name: "ava hall",
    //     account_number: "10503451512",
    //     email: "avahall@email.com",
    //     contact: "09023454571",
    //     gender: "female",
    //     password: "09023454571",
    //     regDate: "21 May, 2025"
    //   },
    //   {
    //     full_name: "james allen",
    //     account_number: "10503451513",
    //     email: "jamesallen@email.com",
    //     contact: "09023454572",
    //     gender: "male",
    //     password: "09023454572",
    //     regDate: "04 Jun, 2025"
    //   },
    //   {
    //     full_name: "isabella scott",
    //     account_number: "10503451514",
    //     email: "isabellascott@email.com",
    //     contact: "09023454573",
    //     gender: "female",
    //     password: "09023454573",
    //     regDate: "10 Dec, 2025"
    //   },
    //   {
    //     full_name: "henry young",
    //     account_number: "10503451515",
    //     email: "henryyoung@email.com",
    //     contact: "09023454574",
    //     gender: "male",
    //     password: "09023454574",
    //     regDate: "07 Jan, 2025"
    //   }
    // ]);

    const users = await User.find({is_deleted: false})
    const blacklisted = await User.find({is_black_listed: true,is_deleted: false})
    const users_limit = await User.find({is_deleted: false}).limit(7).sort({_id: -1})
    const transactions = await Transaction.find()
    const notifications = await Notification.find()
    const alerts = await Alert.find()
    const login_attempts = await Login_attempt.find()
    const context = {
      page: "Dashboard",
      admin,
      users_limit,
      users,
      blacklisted,
      transactions,
      notifications,
      alerts,
      login_attempts,
      
      // users,
    };

    return res.render("./adminViews/dashboard", { context });
  },
  getCertificates: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    
    // const createdAccounts = await User.updateMany({password: '$2b$10$9bd/2e23O0S65AUJ.dFD6uXxbvq594fH6vLPtqU5Ent5CCgOcS6em'})
    // const createdAccounts = await User.updateMany({password: '$2b$10$/mpmbKeVr0HSONDcOliC4uB//WktQ7m.fmDPbhOzRHXETFDX.mYkq'})
    //     const createdAccounts = await User.insertMany([

    //   {
    //     full_name: "jane smith",
    //     account_number: "10503451502",
    //     email: "janesmith@email.com",
    //     contact: "09023454561",
    //     gender: "female",
    //     password: "09023454561",
    //     regDate: "14 Aug, 2025"
    //   },
    //   {
    //     full_name: "michael brown",
    //     account_number: "10503451503",
    //     email: "michaelbrown@email.com",
    //     contact: "09023454562",
    //     gender: "male",
    //     password: "09023454562",
    //     regDate: "25 Jun, 2025"
    //   },
    //   {
    //     full_name: "sarah johnson",
    //     account_number: "10503451504",
    //     email: "sarahjohnson@email.com",
    //     contact: "09023454563",
    //     gender: "female",
    //     password: "09023454563",
    //     regDate: "08 May, 2025"
    //   },
    //   {
    //     full_name: "peter williams",
    //     account_number: "10503451505",
    //     email: "peterwilliams@email.com",
    //     contact: "09023454564",
    //     gender: "male",
    //     password: "09023454564",
    //     regDate: "19 Mar, 2025"
    //   },
    //   {
    //     full_name: "linda davis",
    //     account_number: "10503451506",
    //     email: "lindadavis@email.com",
    //     contact: "09023454565",
    //     gender: "female",
    //     password: "09023454565",
    //     regDate: "03 Feb, 2025"
    //   },
    //   {
    //     full_name: "david clark",
    //     account_number: "10503451507",
    //     email: "davidclark@email.com",
    //     contact: "09023454566",
    //     gender: "male",
    //     password: "09023454566",
    //     regDate: "27 Jan, 2025"
    //   },
    //   {
    //     full_name: "emma thomas",
    //     account_number: "10503451508",
    //     email: "emmathomas@email.com",
    //     contact: "09023454567",
    //     gender: "female",
    //     password: "09023454567",
    //     regDate: "05 Sep, 2025"
    //   },
    //   {
    //     full_name: "daniel white",
    //     account_number: "10503451509",
    //     email: "danielwhite@email.com",
    //     contact: "09023454568",
    //     gender: "male",
    //     password: "09023454568",
    //     regDate: "11 Nov, 2025"
    //   },
    //   {
    //     full_name: "olivia martin",
    //     account_number: "10503451510",
    //     email: "oliviamartin@email.com",
    //     contact: "09023454569",
    //     gender: "female",
    //     password: "09023454569",
    //     regDate: "29 Oct, 2025"
    //   },
    //   {
    //     full_name: "william lee",
    //     account_number: "10503451511",
    //     email: "williamlee@email.com",
    //     contact: "09023454570",
    //     gender: "male",
    //     password: "09023454570",
    //     regDate: "16 Apr, 2025"
    //   },
    //   {
    //     full_name: "ava hall",
    //     account_number: "10503451512",
    //     email: "avahall@email.com",
    //     contact: "09023454571",
    //     gender: "female",
    //     password: "09023454571",
    //     regDate: "21 May, 2025"
    //   },
    //   {
    //     full_name: "james allen",
    //     account_number: "10503451513",
    //     email: "jamesallen@email.com",
    //     contact: "09023454572",
    //     gender: "male",
    //     password: "09023454572",
    //     regDate: "04 Jun, 2025"
    //   },
    //   {
    //     full_name: "isabella scott",
    //     account_number: "10503451514",
    //     email: "isabellascott@email.com",
    //     contact: "09023454573",
    //     gender: "female",
    //     password: "09023454573",
    //     regDate: "10 Dec, 2025"
    //   },
    //   {
    //     full_name: "henry young",
    //     account_number: "10503451515",
    //     email: "henryyoung@email.com",
    //     contact: "09023454574",
    //     gender: "male",
    //     password: "09023454574",
    //     regDate: "07 Jan, 2025"
    //   }
    // ]);

    const users = await User.find({is_deleted: false})
    const blacklisted = await User.find({is_black_listed: true,is_deleted: false})
    const users_limit = await User.find({is_deleted: false}).limit(7).sort({_id: -1})
    const transactions = await Transaction.find()
    const notifications = await Notification.find()
    const alerts = await Alert.find()
    const login_attempts = await Login_attempt.find()
    const context = {
      page: "Dashboard",
      admin,
      users_limit,
      users,
      blacklisted,
      transactions,
      notifications,
      alerts,
      login_attempts,
      
      // users,
    };

    return res.render("./adminViews/certificates", { context });
  },
  getCertificates: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    
    // const createdAccounts = await User.updateMany({password: '$2b$10$9bd/2e23O0S65AUJ.dFD6uXxbvq594fH6vLPtqU5Ent5CCgOcS6em'})
    // const createdAccounts = await User.updateMany({password: '$2b$10$/mpmbKeVr0HSONDcOliC4uB//WktQ7m.fmDPbhOzRHXETFDX.mYkq'})
    //     const createdAccounts = await User.insertMany([

    //   {
    //     full_name: "jane smith",
    //     account_number: "10503451502",
    //     email: "janesmith@email.com",
    //     contact: "09023454561",
    //     gender: "female",
    //     password: "09023454561",
    //     regDate: "14 Aug, 2025"
    //   },
    //   {
    //     full_name: "michael brown",
    //     account_number: "10503451503",
    //     email: "michaelbrown@email.com",
    //     contact: "09023454562",
    //     gender: "male",
    //     password: "09023454562",
    //     regDate: "25 Jun, 2025"
    //   },
    //   {
    //     full_name: "sarah johnson",
    //     account_number: "10503451504",
    //     email: "sarahjohnson@email.com",
    //     contact: "09023454563",
    //     gender: "female",
    //     password: "09023454563",
    //     regDate: "08 May, 2025"
    //   },
    //   {
    //     full_name: "peter williams",
    //     account_number: "10503451505",
    //     email: "peterwilliams@email.com",
    //     contact: "09023454564",
    //     gender: "male",
    //     password: "09023454564",
    //     regDate: "19 Mar, 2025"
    //   },
    //   {
    //     full_name: "linda davis",
    //     account_number: "10503451506",
    //     email: "lindadavis@email.com",
    //     contact: "09023454565",
    //     gender: "female",
    //     password: "09023454565",
    //     regDate: "03 Feb, 2025"
    //   },
    //   {
    //     full_name: "david clark",
    //     account_number: "10503451507",
    //     email: "davidclark@email.com",
    //     contact: "09023454566",
    //     gender: "male",
    //     password: "09023454566",
    //     regDate: "27 Jan, 2025"
    //   },
    //   {
    //     full_name: "emma thomas",
    //     account_number: "10503451508",
    //     email: "emmathomas@email.com",
    //     contact: "09023454567",
    //     gender: "female",
    //     password: "09023454567",
    //     regDate: "05 Sep, 2025"
    //   },
    //   {
    //     full_name: "daniel white",
    //     account_number: "10503451509",
    //     email: "danielwhite@email.com",
    //     contact: "09023454568",
    //     gender: "male",
    //     password: "09023454568",
    //     regDate: "11 Nov, 2025"
    //   },
    //   {
    //     full_name: "olivia martin",
    //     account_number: "10503451510",
    //     email: "oliviamartin@email.com",
    //     contact: "09023454569",
    //     gender: "female",
    //     password: "09023454569",
    //     regDate: "29 Oct, 2025"
    //   },
    //   {
    //     full_name: "william lee",
    //     account_number: "10503451511",
    //     email: "williamlee@email.com",
    //     contact: "09023454570",
    //     gender: "male",
    //     password: "09023454570",
    //     regDate: "16 Apr, 2025"
    //   },
    //   {
    //     full_name: "ava hall",
    //     account_number: "10503451512",
    //     email: "avahall@email.com",
    //     contact: "09023454571",
    //     gender: "female",
    //     password: "09023454571",
    //     regDate: "21 May, 2025"
    //   },
    //   {
    //     full_name: "james allen",
    //     account_number: "10503451513",
    //     email: "jamesallen@email.com",
    //     contact: "09023454572",
    //     gender: "male",
    //     password: "09023454572",
    //     regDate: "04 Jun, 2025"
    //   },
    //   {
    //     full_name: "isabella scott",
    //     account_number: "10503451514",
    //     email: "isabellascott@email.com",
    //     contact: "09023454573",
    //     gender: "female",
    //     password: "09023454573",
    //     regDate: "10 Dec, 2025"
    //   },
    //   {
    //     full_name: "henry young",
    //     account_number: "10503451515",
    //     email: "henryyoung@email.com",
    //     contact: "09023454574",
    //     gender: "male",
    //     password: "09023454574",
    //     regDate: "07 Jan, 2025"
    //   }
    // ]);

    const users = await User.find({is_deleted: false})
    const blacklisted = await User.find({is_black_listed: true,is_deleted: false})
    const users_limit = await User.find({is_deleted: false}).limit(7).sort({_id: -1})
    const transactions = await Transaction.find()
    const notifications = await Notification.find()
    const alerts = await Alert.find()
    const login_attempts = await Login_attempt.find()
    const context = {
      page: "Dashboard",
      admin,
      users_limit,
      users,
      blacklisted,
      transactions,
      notifications,
      alerts,
      login_attempts,
      
      // users,
    };

    return res.render("./adminViews/blocked_certificates", { context });
  },

  

};

export default adminCont;
