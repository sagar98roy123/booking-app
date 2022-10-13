import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("Hello user you are logged in");
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Hello user you can delete your account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Hello Admin you can delete all account");
// })

//UPDATE
router.put("/update/:id",verifyUser,updateUser);
//DELETE
router.delete("/delete/:id",verifyUser,deleteUser);
//GET
router.get("/one/:id",verifyUser,getUser);
//GETALL
router.get("/all",verifyAdmin,getAllUser);

export default router;