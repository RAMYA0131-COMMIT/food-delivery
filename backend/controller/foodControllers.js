import foodModel from "../models/foodModels.js";
import fs from 'fs'

//add food item

const addFood = async(req,res)=>{
    try{
    let image_filename = req.file;
    // console.log(image_filename);
    
    const food = {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename.filename
    }

       await foodModel.create(food);
       res.json({success:true,message:"Food Added"})
    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
  
}
//All food list get method

const listFood = async (req,res) => {
try{
   const food = await foodModel.find({});
   res.json({success:true,data:food})
}catch(error){
   console.log(Error);
   res.json({success:false,message:"Error"}) 
}
}
//remove food item

const removeFood = async (req,res) =>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`files/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

export {addFood,listFood,removeFood}












