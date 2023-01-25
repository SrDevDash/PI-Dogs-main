const { default: axios } = require('axios');
const { Router } = require('express');

const { Temperament, Breed } = require('../db');
const { transform } = require('./lbToKg');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    try {
        let breedDB = await Breed.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    BreedTemperament: []
                }
            }
        });
        let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

        const { name } = req.query;

        // this is to know if a breed is from db
        breedDB = breedDB.map(breed => { return { ...breed.dataValues, temperament: breed.dataValues.Temperaments.map(t => t.name), db: true, Temperaments: undefined } });

        const mapDogs = dogs.data.map(dog => {
            return { id: dog.id, name: dog.name, weight: transform(dog.weight), temperament: dog.temperament?.split(', '), image: dog.image.url }
        })

        dogs = [...mapDogs, ...breedDB];

        if (name) {
            dogs = dogs.filter(dog => { return dog.name.toUpperCase().includes(name.toUpperCase()) })
        }

        res.status(200).send(dogs.length ? dogs : { msg: `Dogs not found with that name` });
    } catch (error) {
        res.status(400).send(error.message)
    }

    res.end();
})

router.get('/breeds/:id', async (req, res) => {
    const { id } = req.params

    try {
        const breedsAPI = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        let breedDB = await Breed.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    BreedTemperament: []
                }
            }
        });

        breedDB = breedDB.map(breed => { return { ...breed.dataValues, temperament: breed.dataValues.Temperaments.map(t => t.name), db: true, Temperaments: undefined } });

        let result = breedsAPI.data.filter(dog => dog.id == id).map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                weight: transform(dog.weight),
                life_span: dog.life_span,
                temperament: dog.temperament?.split(', '),
                image: dog.image.url,
                height: dog.height.metric
            }
        })

        const breeds = [...result, ...breedDB]

        res.status(200).send(breeds.length ? breeds : { msg: 'Dog not found' });

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

    res.status(200).send({ ...result.dataValues, temperament: tempMap, db: true });
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
