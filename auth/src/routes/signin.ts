import express , {Request , Response} from "express";

import { BadRequestError , validateRequest } from "@microservicecourse/common";
import { body  } from "express-validator";
import { Password } from "../services/password";
import { issueJwt } from '../services/jwt';
import {User} from '../models/user';


const router = express.Router();

router.post("/api/users/signin",[
    body("email").isEmail().withMessage("Invalid email!"),
    body("password").trim().isLength({max:20 , min:4}).withMessage("Invalid Password")
], validateRequest , async (req : Request, res : Response) => {
        


    const {email , password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw new BadRequestError("There are no accounts registered with this mail id.");
    }

    const passwordMatch = await Password.compare(user.password , password);
    if(!passwordMatch){
        throw new BadRequestError("Invalid password");
    }

    const jwt = issueJwt(user);

    req.session={
        jwt 
    }

    res.status(200).send(user);
});

export { router as signinRouter };
