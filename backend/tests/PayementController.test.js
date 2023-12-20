import request from 'supertest';
import app from '../app'; 
import { faker } from '@faker-js/faker';
jest.mock('../models/Payement');
jest.mock('../models/Appartment');

const mockAppartementId = '657da9071e80481b0c4b133f';

describe('Payement Controller', () => {
  it('should create a new Payement and update the associated Appartement', async () => {
    const mockPayementData = {
      date: { month: 12, year: 2023 },
      appartement:{ 
		
			"_id": "6581b5945ee0a783a5b2f0a3"
			,
			"numero": "pigomomeg",
			"etage": "qafitosiq",
			"client": "sivoky",
			"address": "topimyfo",
			"prix": "zuzyhukeq",
			"immeuble": "niqicam",
			"payement": [],
			"syndic": "657c23bcbebf0a01d3c29804",
		
		  },
    };

    const response = await request(app)
      .post('/payement') 
      .send(mockPayementData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(Appartement.findById).toHaveBeenCalledWith(mockAppartementId);
    expect(Appartement.findById().save).toHaveBeenCalled();
  });

  it('should get all Payements', async () => {
    const mockPayements = [
      {
        _id: '657df2fd29555f20af752ba1',
        date: { month: 12, year: 2023 },
        appartement: {
			"_id": "6581b5945ee0a783a5b2f0a3"
			,
			"numero": "pigomomeg",
			"etage": "qafitosiq",
			"client": "sivoky",
			"address": "topimyfo",
			"prix": "zuzyhukeq",
			"immeuble": "niqicam",
			"payement": [],
			"syndic": "657c23bcbebf0a01d3c29804",
		},
      },
    ];
    

    const response = await request(app)
      .get('/payement')
      .accept("*");

    expect(response.statusCode).toBe(200);
 
  });
});
