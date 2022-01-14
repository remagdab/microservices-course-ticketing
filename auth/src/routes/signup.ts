import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt  from "jsonwebtoken";

import { BadRequestError } from "@microservicecourse/common";
import { User } from "../models/user";
import {validateRequest} from "@microservicecourse/common";


const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use");
      throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    console.log("Creating user...");
    //throw new DatabaseConnectionError();


    //generate jwt
    const userJwt = jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_KEY! )

    req.session={
        jwt : userJwt
    }
    res.status(201).send(user);
  }
);

export { router as signupRouter };
