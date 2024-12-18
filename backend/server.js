import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoutes.js";
import orederRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/images",express.static('files'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orederRouter)

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});









