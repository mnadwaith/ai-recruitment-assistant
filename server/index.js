import e from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";

dotenv.config({ path: "./config/.env" });
const app = e();


app.listen(process.env.PORT, (error) => {
    try {
        dbConnect();
        if (error) throw error;
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log("Error in starting server", error.message);
    }
})