const { Router } = require('express');
const dogRouter = Router();
const { getDogs, createDog, getDogById, findDogByName } = require('../controllers/dogControllers');
const { getDogImg } = require('../controllers/getDogImg');
const axios = require('axios');
const { API_KEY } = process.env;
const URLbreeds = "https://api.thedogapi.com/v1/breeds"
const headers = {
    headers: {
        "x-api-key": API_KEY,
    },
};

// TRABAJAME ESTA!!!!!!!
// 📍 GET | /dogs/name?="..." 
// Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe la raza, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
dogRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    let searchName = name.toLowerCase();
    let dogArr = [];

    // BDD
    // await findDogByName(searchName)
    //     .then((DBName) => {
    //         console.log('esto es DBName', DBName)
    //         DBName.forEach((dog) => dogArr.push(dog))
    //     })

    // Api
    try {
        await axios(URLbreeds + '/search?q=' + searchName, headers)
            .then((response) => {
                let results = response.data;
                return results
            })
            .then((results) => {
                results.forEach(async (res) => {
                    if (res.reference_image_id) {
                        let arrWeight = res.weight.metric.split(' ');
                        let minWeight = arrWeight[0]
                        let dog = {
                            id: res.id,
                            name: res.name,
                            weight: res.weight.metric + ' kg.',
                            height: res.height.metric + ' cm.',
                            minWeight: minWeight,
                            span: res.life_span,
                            temperament: res.temperament,
                            image: await getDogImg(res.reference_image_id)
                        }
                        console.log('this is the dog', dog)
                        dogArr.push(dog)
                    }
                })
                return dogArr
            })
            .then((dogArr) => {
                console.log('esto es el array al final', dogArr)
                res.status(200).json(dogArr)
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// 📍 GET | /dogs/:idRaza
// Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
// La raza es recibida por parámetro (ID).
// Tiene que incluir los datos de los temperamentos asociadas a esta raza.
// Debe funcionar tanto para los perros de la API como para los de la base de datos.
dogRouter.get('/:idBreed', async (req, res) => {
    const { idBreed } = req.params;
    // BDD
    if (idBreed.length > 10) {
        const breedBDD = await getDogById(idBreed);
        if (breedBDD) res.status(200).json(breedBDD)
        else res.status(400).json({ error: error.message });
    }

    // Api
    else try {
        await axios(URLbreeds + '/' + idBreed, headers)
            .then(async (response) => {
                let { id, name, weight, height, life_span, temperament, reference_image_id } = response.data;
                let arrWeight = weight.metric.split(' ');
                let minWeight = arrWeight[0]
                let dog = {
                    id: id,
                    name: name,
                    weight: weight.metric + ' kg.',
                    height: height.metric + ' cm.',
                    minWeight: minWeight,
                    span: life_span,
                    temperament: temperament,
                    image: await getDogImg(reference_image_id)
                }
                if (dog) res.status(200).json(dog)
                else {
                    let notFound = `The Dog with id ${idBreed} does not exist... yet`;
                    return res.status(200).json(notFound)
                }
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// 📍 GET | /dogs
// Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
dogRouter.get('/', async (req, res) => {
    try {
        let arrDogs = [];
        let dogsDB = await getDogs();
        dogsDB.forEach((dog) => arrDogs.push(dog))
        await axios.get(URLbreeds, headers)
            .then((response) => {
                let data = response.data;
                return data;
            })
            .then((data) => {
                data.forEach((breed) => {
                    let arrWeight = breed.weight.metric.split(' ');
                    let minWeight = arrWeight[0]
                    let dog = {
                        id: breed.id,
                        name: breed.name,
                        image: breed.image.url,
                        height: breed.height.metric + ' cm.',
                        weight: breed.weight.metric + ' kg.',
                        minWeight: minWeight,
                        span: breed.life_span,
                        temperament: breed.temperament
                    }
                    arrDogs.push(dog)
                });
                return arrDogs;
            })
            .then((arrDogs) => {
                res.status(200).json(arrDogs)
            })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// 📍 POST | /dogs
// Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
// Toda la información debe ser recibida por body.
// Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).
dogRouter.post('/newDog', (req, res) => {
    try {
        let dog = req.body.perro;

        const newDog = createDog(dog);
        res.status(200).json(newDog)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = { dogRouter }