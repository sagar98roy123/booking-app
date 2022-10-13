import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req,res,next) =>{

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms : savedRoom.id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}

export const updateRoom = async (req,res,next)=>{
    try{
        const updatedRoom = 
            await Room.findByIdAndUpdate(req.params.id,
                { $set:req.body},
                {new:true});
        res.status(200).json(updatedRoom);
    }catch(error){
        next(error);
    }
}

export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try{
        const deletedRoom = await Room.findByIdAndRemove(req.params.id);
        console.log(deletedRoom);
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms : deletedRoom._id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(deletedRoom);
    }catch(err){
        next(err);
    }
}

export const getRoom = async (req,res,next)=>{
    try{
        const fetchedRoom= await Room.findById(req.params.id);
        res.status(201).json(fetchedRoom);
    }catch(error){
        next(error);
    }
}

export const getAllRoom = async (req,res,next)=>{
    const failed=false;
    if(failed){
        return next(createError(401,"You are not authenticated!"));
    }
    try{
        const fetchedRooms= await Room.find();
        res.status(201).json(fetchedRooms);
    }catch(err){
        return  next(err);
    }
}