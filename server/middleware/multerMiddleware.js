import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure temp_uploads directory exists
const tempUploadsDir = 'temp_uploads/';

if (!fs.existsSync(tempUploadsDir)) {
    fs.mkdirSync(tempUploadsDir);
}

// Configure multer storage
const storage = multer.diskStrorage({
    destination: (req, file, cb) => {
        cb(null, tempUploadsDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter to accept only DOCX and PDF files
const fileFiler = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    } else {
        cb(new Error('Only .pdf and .docx files are allowed!'), false);
    }
};

//Initialize multer with the defined storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFiler,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
});


export default upload;