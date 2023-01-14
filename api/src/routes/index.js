const { default: axios } = require('axios');
const { Router } = require('express');

const { Temperament } = require('../db');
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
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: dog.image.url,
                height: dog.height
            }
        })


        res.status(200).send(result.length ? result : { msg: 'Dog not found' });

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

    res.end();
})

router.post('/dogs', (req, res) => {

    const { name, height, weight, life_span, temperaments } = req.body;


})

router.get('/temperaments', async (req, res) => {
    try {
        let temperamentsDB = await Temperament.findAll();
        let msg = 'Data from DB'

        if (!temperamentsDB.length) {
            const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
            const temperaments = [...new Set(
                dogs.data.flatMap(dog => dog.temperament?.split(', ')))]
                .map(temperament => ({ name: temperament }));

            await Temperament.bulkCreate(temperaments)
            temperamentsDB = temperaments;

            msg = 'Data from API'
        }

        res.status(200).send({ msg, data: temperamentsDB });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


module.exports = router;
