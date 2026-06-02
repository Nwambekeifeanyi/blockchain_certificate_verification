// 09-08-2025
import express  from "express";
import dotenv from "dotenv";
dotenv.config()
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dbConnect from "./src/config/dbConnection.js";
import path from 'path';
import adminRoute from "./src/routes/adminRoute.js";
import authRoute from "./src/routes/authRoute.js";
import pageRoute from "./src/routes/pageRoute.js";

import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/admin', adminRoute)
app.use('/auth',authRoute)
app.use(pageRoute)
app.set('view engine', 'ejs')

// Connect to Db
dbConnect().then(res => console.log('Connected'))
.catch(e =>{
    console.log(e);
})

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public')))

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server running at port http://localhost:2900');
})