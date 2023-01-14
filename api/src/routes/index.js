const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    try {
        let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

        const { name } = req.query;


        if (name) {
            dogs.data = dogs.data.filter(dog => dog.name.includes(name))
        }

        const mapDogs = dogs.data.map(dog => {
            return { id: dog.id, name: dog.name, weight: dog.weight, temperament: dog.temperament, image: dog.image.url }
        })


        res.status(200).send(mapDogs.length ? mapDogs : { msg: `Dogs not found with that name` });
    } catch (error) {
        res.status(400).send(error.message)
    }

    res.end();
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params

    try {
        const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

        let result = dogs.data.filter(dog => dog.id == id).map(dog => {
            return { id: dog.id, name: dog.name, weight: dog.weight, life_span: dog.life_span, temperament: dog.temperament, image: dog.image.url, height: dog.height }
        })


        res.status(200).send(result.length ? result : { msg: 'Dog not found' });

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

    res.end();
})

module.exports = router;
