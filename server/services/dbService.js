import Candidates from '../models/candidatesModel.js';

export const createCandidate = async (candidateData) => {
    try {
        const newCandidate = await Candidates.create(candidateData);
        return newCandidate;
    } catch (error) {
        console.error("Database Save Error:", error.message);
        throw new Error('Error creating candidate');
    }
}