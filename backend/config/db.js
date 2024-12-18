import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://ramya:Ramya123@ramya.vuooh.mongodb.net/food-del?retryWrites=true&w=majority&appName=Ramya')
    .then(()=>console.log("MONGODB CONNECTED"));
}