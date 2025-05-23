import express from 'express';
import { User } from '../models/userModel.js';
import mongoose from 'mongoose';

// add item in user cart
const addToCart = async (req, res) => {
    try {
        // Find user by userId
        let userData = await User.findById(req.body.userId);
 
        // Check if the user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
 
        // Extract cartData or initialize it if not present
        let cartData = userData.cartData || {};
 
        // Add the item to the cart, or increase the quantity if it exists
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
 
        // Update the user's cartData in the database
        await User.findByIdAndUpdate(req.body.userId, { cartData });
 
        // Send success response
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
 };
 
// remove item in user cart
const removeToCart =async(req,res)=>{
    try{
        let userData = await User.findById({_id:req.body.userId});
        let cartData = await userData.cartData;   //extract the cartdata

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await User.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Remove from Cart"});

    }catch(error){
        console.log(error);
        res.json({siccess:false,message:"Error"});
    }
}

//fetch user card data
const getCart = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let userData = await User.findById(req.body.userId); // No need for {_id: req.body.userId}
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData; // Directly access, no need for await
        
        return res.json({ success: true, data: cartData });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export {addToCart,removeToCart,getCart}