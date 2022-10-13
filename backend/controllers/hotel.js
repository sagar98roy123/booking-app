import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        next(error)
    } 
}

export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = 
            await Hotel.findByIdAndUpdate(req.params.id,
                { $set:req.body},
                {new:true});
        res.status(200).json(updatedHotel);
    }catch(error){
        next(error);
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedHotel);
    }catch(err){
        next(err);
    }
}

export const getHotel = async (req,res,next)=>{
    try{
        const fetchedHotel= await Hotel.findById(req.params.id);
        res.status(201).json(fetchedHotel);
    }catch(error){
        next(error);
    }
}

export const getAllHotel = async (req,res,next)=>{
    const failed=false;
    if(failed){
        return next(createError(401,"You are not authenticated!"));
    }
    try{
        const fetchedHotels= await Hotel.find();
        res.status(201).json(fetchedHotels);
    }catch(err){
        return  next(err);
    }
}

export const countHotelByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",");
    const failed=false;
    if(failed){
        return next(createError(401,"You are not authenticated!"));
    }
    try{
        const list= await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list);
    }catch(err){
        return  next(err);
    }
}

export const countHotelByType = async (req,res,next)=>{
    const failed=false;
    if(failed){
        return next(createError(401,"You are not authenticated!"));
    }
    try{
        const list= await Hotel.countDocuments(({city:city}));
        res.status(200).json(list);
    }catch(err){
        return  next(err);
    }
}

