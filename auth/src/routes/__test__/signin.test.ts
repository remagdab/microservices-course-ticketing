import request from 'supertest';
import { app } from '../../app';



it("Email doesn't exits" , async () =>{
    return request(app)
    .post('/api/users/signin')
    .send({
        email : "test@ttest.com",
        password : ' password'
    })
    .expect(400);
})

it("wrong password" , async () =>{
    await  request(app)
    .post('/api/users/signup')
    .send({
        email : "test@test.com",
        password : ' password'
    })
    .expect(201);

    return request(app)
    .post('/api/users/signin')
    .send({
        email : "test@test.com",
        password : ' passwodddrd'
    })
    .expect(400);
    
})

it("successful loginp" , async () =>{

    await  request(app)
    .post('/api/users/signup')
    .send({
        email : "test@test.com",
        password : ' password'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email : "test@test.com",
        password : ' password'
    })
    .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
    
})