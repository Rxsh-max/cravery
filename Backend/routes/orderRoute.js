import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { placeOrder, verifyOrder } from '../controllers/orderController.js'


const orderRouter = express.Router()


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify-order",verifyOrder)



export default orderRouter;