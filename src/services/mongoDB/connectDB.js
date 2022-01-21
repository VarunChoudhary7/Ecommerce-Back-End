import mongoose from "mongoose";

const connectDB = async () => {
    const connectionString = process.env.DB_URL

    try {
        await mongoose.connect(connectionString)
        console.log("Connected to Database")
    } catch (error) {
        console.log(`Could Not Connect to DB: ${error.message}`)
        console.log(error.message)
    }
}

export default connectDB;