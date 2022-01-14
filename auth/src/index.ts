import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI undefined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
start();
