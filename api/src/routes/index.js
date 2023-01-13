const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', async (req, res) => {
    try {
        const dogs = await axios.get('https://api.thedogapi.com/v1/breeds');

        const mapDogs = dogs.map(dog => {
            return { id: dog.id, name: dog.name, weight: dog.weight, height: dog.height, life_span: dog.life_span }
        })
        res.status(200).send(mapDogs);
    } catch (error) {
        res.status(400).send({ error })
    }

    res.end();
})

module.exports = router;
