import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: Number,
    },
    location: {
        type: String,
    },
    logo:{
        type: String,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamp: true});

export const Company = mongoose.model("Company", companySchema);