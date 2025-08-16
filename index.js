import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./Routes/user.routes"

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",userRouter)

mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>{
                console.log("MongoDB connected")
                app.listen(port,()=>{
                        console.log("server at http://localhost:3000")
                })
        })
        .catch((err)=>{
                console.log("mongodb error : ",err)
        })