import express from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel,countHotelByCity } from "../controllers/hotel.js";
import{ verifyAdmin,verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE

router.post("/register",verifyAdmin,createHotel);

//UPDATE
router.put("/update/:id",verifyAdmin,updateHotel);
//DELETE
router.delete("/delete/:id",verifyAdmin,deleteHotel);
//GET
router.get("/one/:id",getHotel);
//GETALL
router.get("/all",getAllHotel);
//GETHOTELSBYCITY
router.get("/countByCity", countHotelByCity)
router.get("/countByType", getHotel)

export default router;