const express=require("express");
const cors =require('cors');
const amazonrouter=require('./Routers/amazonrouter');
const mongo=require("./connect");
const dotenv=require("dotenv");
const {scraper}=require("./scraper/scraperamzon");
//here i called the database connection
mongo.connect();
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/",(req,res,next)=>{
    next();
});
//amazon
app.use("/amazon",amazonrouter);
//here initially called the scraper
scraper();
//to update the value i call scraper function for every 12 hours
setInterval(()=>{scraper()},43200000);

//console.log(process.env.PORT);
app.listen(process.env.PORT);



