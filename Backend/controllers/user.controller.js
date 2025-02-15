import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        console.log(req.body);
        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role
        });
        res.status(200).json({ message: "User created successfully", success: true  });
    } catch (error) {
        console.log("Error in user registration:", error.message);

    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(email, password, role);
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // check user role
        if (user.role !== role) {
            return res.status(403).json({ message: "Unauthorized", success: false });
        }


        // create token

        const tokendata = {
            userID: user._id,
        }
        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
        }

        return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ message: "User logged in successfully", user, success: true });
    } catch (error) {
        console.log(error);

    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.log(error);

    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        const file = req.file;

        //cloudinary upload....

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication se aayega

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        //updating user
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        //resume upload....


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
        }

        return res.status(200).json({ message: "Profile updated successfully", user, success: true });

    } catch (error) { }
};
