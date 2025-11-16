import mongoose from "mongoose";

async function dbConnect() {

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB", error.message);
    }

}

export default dbConnect;