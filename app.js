import express from "express";
//import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
//import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"; //"Cross Origin Resource Sharing"


export const app = express();
//CONFIG DOTENV--------------------------------------------------------------------------
config({
    path: "./data/config.env"
})
//MiddleWare-----------------------------------------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If false header will not deliver to frontend make sure to true it too on frontend
}));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//DataBase Connection--------------------------------------------------------------------
//connectDB();         //data/database.js/connectDB
//Schema
// - Models/user.js

//---------------------------------------------------------------------------------------

app.get("/", (req, res) => {
    res.send("Nice");
})
//Server-------------------------------------------------------------------------------------------

app.use(errorMiddleware);