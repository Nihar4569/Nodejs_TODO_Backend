import jwt from "jsonwebtoken";


export const sendCookie = (nuser, res, message, status = 200) => {
    const token = jwt.sign({ _id: nuser._id }, process.env.JWT_SECRET);

    res.status(status).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", //None -As our backend and frontend will be deploy deifferently
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message,
    });
}