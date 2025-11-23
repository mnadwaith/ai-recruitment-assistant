import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";


const router = Router();
// Define your candidate-related routes here

router.post('injest-candidate', upload.single('resumeFile'),);




export default router;