
import Syndic from '../models/Syndic.js';

const seedSyndics=async  () =>{
  await Syndic.deleteMany({});
  const adminSyndic = {
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin'

  };

  await Syndic.create(adminSyndic);

  console.log('Syndic admin seeded successfully');
  process.exit();
}

export {seedSyndics};
