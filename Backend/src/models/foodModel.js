import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    name : {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    canteenId:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String,
        required:true
    }

},{timestamps:true,minimize:false})

const Food = mongoose.model("Food",foodSchema);

export default Food;