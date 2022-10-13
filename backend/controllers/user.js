import { createError } from "../utils/error.js";
import User from "../models/User.js";



export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = 
            await User.findByIdAndUpdate(req.params.id,
                { $set:req.body},
                {new:true});
        res.status(200).json(updatedUser);
    }catch(error){
        next(error);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedUser);
    }catch(err){
        next(err);
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const fetchedUser= await User.findById(req.params.id);
        res.status(201).json(fetchedUser);
    }catch(error){
        next(error);
    }
}

export const getAllUser = async (req,res,next)=>{
    const failed=false;
    if(failed){
        return next(createError(401,"You are not authenticated!"));
    }
    try{
        const fetchedUsers= await User.find();
        res.status(201).json(fetchedUsers);
    }catch(err){
        return  next(err);
    }
}