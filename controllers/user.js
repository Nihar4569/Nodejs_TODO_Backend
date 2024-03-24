import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or password", 404));
        }
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return next(new ErrorHandler("Invalid Email or password", 404));
        }
        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Exist", 400));
        }

        const hashedpass = await bcrypt.hash(password, 10);

        const nuser = await User.create({ name, email, password: hashedpass })

        sendCookie(nuser, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        message: "hdfsd",
        user: req.user,
    })
}

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", //None -As our backend and frontend will be deploy deifferently
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "Logout Successful"
    })
}


// export const updateUser = async(req,res)=>{
//     const {id}=req.params.id;
//     const user = await User.findById(id);

//     res.json({
//         success:true,
//         message:"Updated",
//     })
// }
// export const deleteUser = async(req,res)=>{
//     const {id}=req.params.id;
//     const user = await User.findById(id);

//     //await user.remove();

//     res.json({
//         success:true,
//         message:"Deleted",
//     })
// }