import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();    //MongoDB Connection

app.listen(process.env.PORT,()=>{
    let port = process.env.PORT;
    console.log(`Server is working in port ${port} in ${process.env.NODE_ENV}Mode`)
});