import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/room.js";
import{ verifyAdmin,verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE

router.post("/register/:hotelId",verifyAdmin,createRoom);

//UPDATE
router.put("/update/:id",verifyAdmin,updateRoom);
//DELETE
router.delete("/delete/:id/:hotelId",verifyAdmin,deleteRoom);
//GET
router.get("/one/:id",getRoom);
//GETALL
router.get("/all",getAllRoom);

export default router;