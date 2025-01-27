import { populate } from "dotenv";
import { Application } from "../models/application.model.js";
import {Job} from "../models/jobs.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(401).json({ message: "Job Id is required", success: false });
        }
        //check if the user already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({ message: "Application submitted successfully", success: true });
    } catch (error) {
        console.log(error);

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path : "job", 
            option: {sort: {createdAt: -1}},
            populate: {
                path : "company",
                option : {sort: {createdAt: -1}}
            }
        }); 
        if (!applications) {
            return res.status(404).json({ message: "No applications found", success: false });
        }
        return res.status(200).json({ applications, success: true });
    } catch (error) {
        console.log(error);

    }
};

//admin dekhega ki kitne applications aaye hai
export const getApplicants = async (req, res) => {
try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path : "applications",
        option : {sort: {createdAt: -1}},
        populate: {
            path : "applicant",
            option : {sort: {createdAt: -1}}
        }
    })
    if(!job){
        return res.status(404).json({message: "Job not found", success: false});
    }

    return res.status(200).json({job, success: true});
    
} catch (error) {
    console.log(error);
    
}
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }

        //find the application by applicationId
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Application status updated", success: true });

    } catch (error) {
        console.log(error);
        
    }
}