const { default: axios } = require('axios');
const { Router } = require('express');

const { Temperament, Breed } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    try {
        const breedDB = await Breed.findAll();
        let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

        const { name } = req.query;

        dogs = [...dogs.data, ...breedDB];

        if (name) {
            dogs = dogs.filter(dog => dog.name.includes(name))
        }

        const mapDogs = dogs.map(dog => {
            return { id: dog.id, name: dog.name, weight: dog.weight.metric, temperament: dog.temperament?.split(', '), image: dog.image.url }
        })


        res.status(200).send(mapDogs.length ? mapDogs : { msg: `Dogs not found with that name` });
    } catch (error) {
        res.status(400).send(error.message)
    }

    res.end();
})

router.get('/breeds/:id', async (req, res) => {
    const { id } = req.params

    try {
        const breedsAPI = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        const breedDB = await Breed.findAll();

        const breeds = [...breedsAPI.data, ...breedDB]


        let result = breeds.filter(dog => dog.id == id).map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament?.split(', '),
                image: dog.image.url,
                height: dog.height.metric
            }
        })


        res.status(200).send(result.length ? result : { msg: 'Dog not found' });

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

    res.end();
})

router.post('/breed', async (req, res) => {

    const { name, height, weight, life_span, image, temperaments } = req.body;

    const result = await Breed.create({ name, height, weight, life_span, image });
    const temperamentToAdd = await Temperament.findAll({
        where: { name: temperaments }
    })

    await result.addTemperaments(temperamentToAdd);

    const tempMap = temperamentToAdd.map(temp => temp.name)

    res.status(200).send({ ...result.dataValues, temperament: tempMap });
})

router.get('/temperaments', async (req, res) => {
    try {
        let temperamentsDB = await Temperament.findAll();
        let msg = 'Data from DB'

        if (!temperamentsDB.length) {
            const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
            const temperaments = [...new Set(
                dogs.data.filter(dog => dog.temperament).flatMap((dog) => dog.temperament.split(', ')))]
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
