const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const Dogs = require('../models/Dogs');
const User = require('../models/User');
const Message = require('../models/Message');

const getAllDogs = require('../controllers/getAllDogs');
const getAllTemperaments = require('../controllers/getAllTemperaments')
const upload = require('../controllers/uploadImage');
const verifyToken = require('../controllers/verifyToken')

const router = Router();

let numericCounter = 295; // Valor inicial del contador

router.get('/dogs', async (req, res) => {
  try {
    const results = await Dogs.find({});
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'Dogs not found' })
    }
  } catch (error) {
    console.error('Error retrieving results:', error);
    res.status(500).json({ error: 'Error retrieving results.' });
  }
});

router.get('/dogis', async (req, res) => {
  getAllDogs()
})

router.get('/dogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Dogs.findOne({ id: id });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'Dog not found' });
    }
  } catch (error) {
    console.log('Error retrieving dog: ', error);
    res.status(500).json({ error: 'Error retrieving dog.' });
  }
});

router.get('/byname', async (req, res) => {
  try {
    const { name } = req.query;
    const results = await Dogs.find({ name: { $regex: name, $options: 'i' } });
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: 'No dogs found with the name: ' + name });
    }
  } catch (error) {
    console.log('Error retrieving dogs:', error);
    res.status(500).json({ error: 'Error retrieving dogs.' });
  }
});

router.post('/dogs', verifyToken, upload, async (req, res) => {
  try {

    const { name, height, weight, life_span, selectedTemperaments } = req.body;
    const image = req.file && req.file.path;

    const dog = new Dogs({
      id: numericCounter,
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
      image: image,
      temperament: selectedTemperaments,
      createdBy: req.userId,
      favoriteBy: null
    });
    const dogSaved = await dog.save();

    if (dogSaved) {
      await User.findByIdAndUpdate(req.userId, { $push: { createdDogs: dogSaved._id } });

      res.status(200).json('Success');
    } else {
      res.status(404).json({ error: "Dog couldn't be saved." });
    }

  } catch (error) {
    console.log('Error to saved dog: ',  error);
    res.status(500).json({ error: 'Error to saved dog.' })
  }
})

router.get('/temperaments', async (req, res) => {
  try {
    const uniqueTemperaments = await getAllTemperaments();
    res.status(200).json(uniqueTemperaments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los temperamentos' });
  }
})

router.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../../images', imageName);
  res.sendFile(imagePath);
});

router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });

  if (!user) {
    return res.status(404).send('No user found')
  }

  res.status(200).json(user)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("The email doesn't exists");
  }

  const validPassword = await user.validatePassword(password);

  if (!validPassword) {
    return res.status(404).json({
      auth: false, 
      token: null, 
      message: "Password incorrect"
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
    expiresIn: parseInt(process.env.AUTH_EXPIRES),
  }); 

  res.status(200).json({auth: true, token});
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('Email already exists.');
    }

    const user = new User({
      name,
      email,
      password,
    });

    user.password = await user.encryptPassword(user.password);

    const userSaved = await user.save();

    if (userSaved) {
      const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
        expiresIn: parseInt(process.env.AUTH_EXPIRES),
      });      

      res.status(200).json({auth: true, token});
    } else {
      throw new Error("User couldn't be created.")
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error saving user.' });
  }
})

router.post('/register/facebook', async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('Email already exists.')
    }

    const user = new User({
      name,
      email,
      password: email
    });

    user.password = await user.encryptPassword(user.password);

    const userSaved = await user.save();

    if (userSaved) {
      const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
        expiresIn: parseInt(process.env.AUTH_EXPIRES),
      });     

      res.status(200).json({ auth: true, token });
    } else {
      throw new Error("User couldn't be created.")
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error saving user.' });
  }
})

router.post('/login/facebook', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("The email doesn't exists.")
  } 
  
  const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
    expiresIn: parseInt(process.env.AUTH_EXPIRES),
  }); 

  res.status(200).json({auth: true, token});
})

router.post('/favorite', verifyToken,async (req, res) => {
  const _id = req.body._id; // Obtener el ID del perro desde req.body._id
  const dog_id = _id;
  try {
    const user = await User.findById(req.userId);
    const dog = await Dogs.findById(dog_id);

    if (!user || !dog) {
      throw new Error('User or dog not found.')
    }

    if (user.favoriteDogs.includes(dog_id)) {
      throw new Error('Dog is already in favorites.');
    }

    user.favoriteDogs.push(dog_id);
    await user.save();

    dog.favoriteBy.push(req.userId);
    await dog.save();

    return res.status(200).json({ message: 'Dog adde to favorites successfully.' })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
});

router.get('/favorite', verifyToken, async (req, res) => {
  try {
    // Obtener el usuario por su ID
    const user = await User.findById(req.userId);

    if (!user) {
      throw new Error('User not found')
    }

    // Obtener los detalles completos de los perros favoritos del usuario
    const favoriteDogs = await Dogs.find({ _id: { $in: user.favoriteDogs } });

    return res.status(200).json(favoriteDogs);
  } catch (error) {
    console.error('Error al obtener los favoritos del usuario:', error);
    return res.status(500).json({ message: 'Error al obtener los favoritos del usuario' });
  }
});

router.get('/mydogs', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new Error('User not found')
    }

    const createDogs = await Dogs.find({ _id: { $in: user.createdDogs } });

    return res.status(200).json(createDogs);
  } catch (error) {
    console.log('error getting the dogs created.', error);
    return res.status(500).json({ message: 'Error getting the dogs created ' });
  }
})

router.delete('/favorite/:id', verifyToken, async (req, res) => {
  const _id = req.params.id; // Obtener el ID del perro desde req.params

  console.log(req.params);
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el perro está en la lista de favoritos del usuario
    const dogIndex = user.favoriteDogs.indexOf(_id);
    if (dogIndex === -1) {
      return res.status(404).json({ message: 'Perro no encontrado en la lista de favoritos del usuario' });
    }

    // Eliminar el perro de la lista de favoritos del usuario
    user.favoriteDogs.splice(dogIndex, 1);
    await user.save();

    return res.status(200).json({ message: 'Dog removed from favorites.' })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/message', async (req, res) => {
  try {
    const message = new Message(req.body);

    const messageSaved = await message.save();

    if (!messageSaved) {
      throw new Error('Error sending the message.');
    } else {
      return res.status(200).json('Success');
    };
  } catch (error) {
    console.log('Error to saved message: ',  error);
    res.status(500).json({ error: 'Error to saved message in DB.' })
  };
});

module.exports = router;