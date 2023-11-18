//creating api router
import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user_controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

// Endpoint for testing
router.get('/', test);

// Endpoint for updating user information
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
export default router;
