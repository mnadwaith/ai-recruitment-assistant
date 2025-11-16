import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rawText: {
        type: String,
        required: true
    },
    resumeVector: {
        type: [Number],
        required: true
    },
    jobTitle: {
        type: String
    },
    similarityScore: {
        type: Number
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: "candidates"
    });

const candidateModel = mongoose.model("Candidate", candidateSchema);

export default candidateModel;