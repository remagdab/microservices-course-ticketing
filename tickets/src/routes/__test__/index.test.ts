import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('it can fetch a list of tickets' , async() => {

    const title = "this is a title";

   await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);
   await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);
   await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);
    

    const response = await request(app)
        .get("/api/tickets")
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});