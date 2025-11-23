import fs from 'fs';
import pdf from 'pdf-parse';

export const parseResumePdf = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath)

        const pdfData = await pdf(dataBuffer);
        const rawText = pdfData.text.trim();

        if (!rawText) {
            throw new Error("Failed to extract text from the resume PDF");
        }

        return rawText;
    } catch (error) {
        console.error("Error parsing PDF:", error.message);
        throw new Error("Error parsing resume PDF");
    }
}

export const deleteTempFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`Temporary file deleted: ${filePath}`);
        } catch (error) {
            console.error("Error deleting temporary file:", error.message);
            throw new Error("Error deleting temporary file");
        }
    }
}


export const extractName = (rawText) => {
    const lines = rawText.split('\n').filter(line => line.trim().length > 0);
    return lines.length > 0 ? lines[0].trim().substring(0, 50) : "Unknown Candidate";
}