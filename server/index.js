import e from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config({ path: "./config/.env" });
const app = e();
app.use(e.json());
app.use(cors());

app.use('candidate', candidateRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

app.listen(process.env.PORT, (error) => {
    try {
        dbConnect();
        if (error) throw error;
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log("Error in starting server", error.message);
    }
})