import bodyParser from 'body-parser'
import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectToDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
config()
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouterRouter)

app.use("/images",express.static('uploads'))

const PORT = process.env.PORT || 3000

app.get("/health" , (req,res)=>{
    res.json({
        "status" : "ok",
        "health" : "ok"

    })
})

connectToDB()
app.listen(PORT , ()=>{
    console.log(`Server is runnig on ${PORT}`)
})


