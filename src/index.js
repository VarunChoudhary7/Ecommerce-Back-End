import express from "express";
import dotenv from "dotenv"
import connectDB from "./services/mongoDB/connectDB";
dotenv.config()
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import productRoutes from "./routes/productRoutes"

const app = express()

const port = process.env.PORT || 3003

connectDB()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())

//route to handle auth request
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.get('/', (req, res) => {
    res.send(`Server running at ${port} (Deployed from workflow with secrets) `)
})

app.listen(port, (req, res) => {
    console.log(`Server listening at port ${port} `)
})