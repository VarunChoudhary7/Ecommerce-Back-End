import express from "express";
import dotenv from "dotenv"
import connectDB from "./services/mongoDB/connectDB";
dotenv.config()
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import productRoutes from "./routes/productRoutes"

const app = express()

const port = process.env.port || 3000

connectDB()

app.use(cors())
app.use(express.json())

//route to handle auth request
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)


app.listen(port, (req, res) => {
    console.log(`Server listening at port ${port}`)
})