import request from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo : any;

declare global {
    var signup: () => Promise<string[]>;
}

beforeAll( async () =>{
    process.env.JWT_KEY = "helloworld"; 
    mongo = await MongoMemoryServer.create();
    console.log(mongo.getUri())
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();

    for( let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () =>{
    await mongo.stop();
    await mongoose.connection.close();
},60000)


global.signup = async () => {
    const email ="test@test.com";
    const password = "helloworld";

    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email , password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;

}