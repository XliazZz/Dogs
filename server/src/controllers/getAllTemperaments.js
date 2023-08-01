const axios = require('axios');

const getAllTemperaments = async () => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const breeds = response.data;

    // Extraer todos los temperamentos de las razas
    const allTemperaments = breeds.reduce((temperaments, breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(', ');
        temperaments.push(...breedTemperaments);
      }
      return temperaments;
    }, []);

    // Filtrar para obtener temperamentos únicos sin repeticiones
    const uniqueTemperaments = [...new Set(allTemperaments)];

    return uniqueTemperaments;
  } catch (error) {
    console.error('Error al obtener los temperamentos:', error.message);
    throw new Error('Error al obtener los temperamentos');
  }
}

module.exports = getAllTemperaments