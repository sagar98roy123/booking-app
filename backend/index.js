import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

 app.get("/",(req,res)=>{
     res.json({"message":"You are connected to this server!"});
 })

//middlewares
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong !";
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message:errorMessage,
        stack:err.stack
    });
})

app.listen(8800, () => {
    connect();
    console.log("Connected to 8080!");
})