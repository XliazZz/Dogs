const axios = require('axios');
const Dogs = require('../models/Dogs');

const getAllDogs = async () => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const data = response.data;
    for (const dogData of data) {
      const dog = new Dogs({
        id: dogData.id,
        image: dogData.image.url,
        name: dogData.name,
        height: dogData.height.metric,
        weight: dogData.weight.metric,
        life_span: dogData.life_span,
        temperament: dogData.temperament,
        origin: dogData.origin
      });
      await dog.save();
    }
    console.log('Data saved in the database');
  } catch (error) {
    console.error('Error to saved the data', error);
  }
};

module.exports = getAllDogs;