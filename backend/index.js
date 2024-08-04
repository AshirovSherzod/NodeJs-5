import express from "express"
import cors from "cors"
import Blog from "./routes/blog.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB is not connected"))

app.get("/", (req, res) => {
    res.json("Server is running")
})

// Endpoints
app.use("/users", Blog)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`${PORT} is listened`))