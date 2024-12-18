import express from "express";
import multer from "multer";  
import { addFood,listFood,removeFood } from "../controller/foodControllers.js"; 

const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
   destination: "files", 
   filename: (req, file, cb) => {
      return cb(null, `${Date.now()}_${file.originalname}`);  
   },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;










