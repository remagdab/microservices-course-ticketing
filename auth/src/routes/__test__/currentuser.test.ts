import request from 'supertest';
import { app } from '../../app';


it("Clears the cookie after signing out " , async () =>{

    const cookie = await signup();

    const response = await  request(app)
    .get('/api/users/currentuser')
    .set('Cookie' , cookie)
    .send()
    .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});