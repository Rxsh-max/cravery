import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/CartController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const cartRoute = express.Router()
cartRoute.use(authMiddleware)
cartRoute.post("/add",addToCart)
cartRoute.post("/remove",removeFromCart)
cartRoute.post("/get",getCart)


export default cartRoute;