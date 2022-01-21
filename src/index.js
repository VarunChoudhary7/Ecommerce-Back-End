import express from "express";
import dotenv from "dotenv"
import connectDB from "./services/mongoDB/connectDB";
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
// console.log(process.env.DB_URL)

connectDB()

app.listen(3000, (req, res) => {
    console.log(`Server listening at port ${port}`)
}) 