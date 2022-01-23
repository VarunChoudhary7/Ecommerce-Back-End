import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.DB_URL.trim()}`)
        console.log("Connected to Database")
    } catch (error) {
        console.log(`Could Not Connect to DB: ${error.message}`)
        console.log(error.message)
    }
}

export default connectDB;