import express from "express";
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder,userOrders, listOrders, updateStatus } from "../controller/orderControllers.js";

const orederRouter = express.Router();

orederRouter.post("/place",authMiddleware,placeOrder);
orederRouter.post("/verify",verifyOrder)
orederRouter.post("/userorders",authMiddleware,userOrders)
orederRouter.get("/listorders",listOrders)
orederRouter.post("/status",updateStatus)

export default orederRouter;