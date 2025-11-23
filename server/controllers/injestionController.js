import { deleteTempFile, extractName, parseResumePdf } from "../services/fileService.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { createCandidate } from "../services/dbService.js";

export const processResume = async (req, res) => {
    const filePath = req.file.path ? req.file.path : null;

    try {
        if (!filePath) {
            return res.status(400).json({ message: "No resume file uploaded" });
        }

        const rawText = await parseResumePdf(filePath);

        const resumeVector = await generateEmbedding(rawText);

        const extractedName = extractName(rawText);

        const newCandidate = await createCandidate({
            name: extractedName,
            rawText: rawText,
            resumeVector: resumeVector,
        });

        return res.status(201).json({ message: "Resume processed successfully", candidate: newCandidate });
    } catch (error) {
        console.log("Error processing resume:", error.message);
        res.status(500).json({ message: "Error processing resume", error: error.message });
    } finally {
        deleteTempFile(filePath)
    }
}