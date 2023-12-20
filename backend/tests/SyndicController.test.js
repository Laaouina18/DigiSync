import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

const mockSyndicId = '6576de7c01924ea9c9d3ef32';

describe('Syndic Controller', () => {
  const mockSyndic = {
    _id: mockSyndicId,
    firstName: 'Minima cupiditate nohhuiiu',
    lastName: '106630993667436202168',
    email: 'nouha@gmail.com',
    password: '$2a$10$Ax5TCvN9LmbpU1Mr7BTNnehQIEMdevFXX.CRIn1LPQrwq3YVNnuGW',
    immeuble: 'dklkd',
    __v: 5,
    Appartements: [
      '65815be9113c1475730552f0',
      '658164467c8f9459c61b3d10',
      '658164a8df1dcc557342e3ed',
      '658165e4df1dcc557342e41d',
      '6581683854e8482f456ce115',
    ],
    role: 'Syndic',
  };

  it('should get all Syndics', async () => {
    jest.spyOn(mongoose.Model, 'find').mockResolvedValue([mockSyndic]);
    const response = await request(app).get('/syndics');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([mockSyndic]);
  });

  it('should create a new Syndic', async () => {
    jest.spyOn(mongoose.Model, 'create').mockResolvedValue(mockSyndic);

    const response = await request(app)
      .post('/syndics')
      .send({
        firstName: 'New',
        lastName: 'Syndic',
        email: 'new_syndic@gmail.com',
        password: 'password123',
        immeuble: 'new_immeuble',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockSyndic);
  });

  it('should update a Syndic', async () => {
    jest.spyOn(mongoose.Model, 'findByIdAndUpdate').mockResolvedValue(mockSyndic);
    const response = await request(app)
      .patch(`/syndics/${mockSyndicId}`)
      .send({
        firstName: 'Updated',
        lastName: 'Syndic',
        email: 'updated_syndic@gmail.com',
        password: 'new_password123',
        immeuble: 'new_immeuble',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSyndic);
  });

  it('should delete a Syndic', async () => {
    jest.spyOn(mongoose.Model, 'findByIdAndDelete').mockResolvedValue(mockSyndic);
    const response = await request(app).delete(`/syndics/${mockSyndicId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSyndic);
  });

  it('should get Syndic by ID', async () => {
    jest.spyOn(mongoose.Model, 'findById').mockResolvedValue(mockSyndic);
    const response = await request(app).get(`/syndics/${mockSyndicId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSyndic);
  });

  it('should search for Syndics', async () => {
    jest.spyOn(mongoose.Model, 'find').mockResolvedValue([mockSyndic]);

    const response = await request(app).get('/syndics/search').query({
      immeuble: 'dklkd',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([mockSyndic]);
  });
});
