import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateEmbedding = async (rawText) => {
    try {
        console.log("Service: Calling OpenAI for embedding...");
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: rawText,
        });
        return embeddingResponse.data[0].embedding;
    } catch (error) {
        console.error("Error generating embedding:", error.message);
        throw new Error("Failed to generate vector embedding from OpenAI.");
    }
}