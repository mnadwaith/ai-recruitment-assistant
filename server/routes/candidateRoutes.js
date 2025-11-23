import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";
import { processResume } from "../controllers/injestionController.js";


const router = Router();

// Define your candidate-related routes here
router.post('injest-candidate', upload.single('resumeFile'), processResume);




export default router;