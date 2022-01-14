import jwt from "jsonwebtoken";

interface UserVar {
    email : string;
    _id : number;
}

export const issueJwt = (user : UserVar) => {
    return jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_KEY! )
}

