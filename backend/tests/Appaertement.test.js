import request from 'supertest';
import app from '../app'; 
import Appartement from '../models/Appartment';

import Syndic from '../models/Syndic';

import { faker } from '@faker-js/faker';

describe('Appartement Controller', () => {
 
	const id="658172ebb69b02b8f769163a";
  it('should create a new Appartement', async () => {
    const testAppartementData = {
      "numero": faker.lorem.word(),
      "etage": faker.lorem.word(),
      "client": faker.lorem.word(),
      "address": faker.lorem.word(),
      "prix": faker.lorem.word(),
      "immeuble": faker.lorem.word(),
      "syndic": "657c23bcbebf0a01d3c29804"
    };

	const { body, statusCode } = await request(app).post("/appartements").accept("*").send(testAppartementData);
	expect(statusCode).toBe(201);
	
  },10000000);

  it('should get an Appartement by ID', async () => {
	
	const { body, statusCode } = await request(app).get(`/appartements/${id}`).accept("*");
	expect(statusCode).toBe(200);
	
  },1000000);

  it('should get all Appartements', async () => {
    const {body,statusCode} = await request(app)
      .get('/appartements')
      .accept("*");
	  expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  it('should update an Appartement', async () => {
    const updatedData = {
      "numero": faker.lorem.word(),  
      "etage": faker.lorem.word(),
      "client": faker.lorem.word(),
      "address": faker.lorem.word(),
      "prix": faker.lorem.word(),
      "immeuble": faker.lorem.word(),
      "syndic": faker.lorem.word()
    };

    const {body,statusCode} = await request(app)
      .patch(`/appartements/${id}`)
      .send(updatedData)
      .accept("*");
	  expect(statusCode).toBe(200);

	  
    const getAppartementResponse = await request(app)
      .get(`/appartements/${id}`)
      .accept("*");

	  expect(statusCode).toBe(200);

	  
  },1000000);

  it('should delete an Appartement', async () => {
    const {statusCode,body} = await request(app)
      .delete(`/appartements/${id}`)
      .accept("*");

	  expect(statusCode).toBe(200);
	
  },1000000);
});
