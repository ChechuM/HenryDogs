const { Dog, Temperament } = require('../db');
const { Dogs_Temperaments } = require('../db');
const { Op } = require("sequelize");

const findDogByName = async (name) => {
    console.log('el nombre en findDogByName', name)
    const results = await Dog.findAll({ include: Temperament });
    console.log('los results en el finDogByName', results)
    let namedDogs = []
    results.map((dog) => {
        if (dog.name === name) return namedDogs.push(dog)
        // usar substring o include
    })
    console.log('el array de los perros filtrados', namedDogs)
    return namedDogs;
}

const getDogById = async (id) => {
    const dog = await Dog.findOne({
        where: { id: id }, include: [{ model: Temperament }]
    });
    if (dog) {
        console.log('caca temps', dog)
        let temps = dog.temperaments.map((temp) => {
            return temp.name
        })
        let perro = {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            span: dog.span,
            temperament: temps.join(', ')
        }
        return perro;
    }
    if (dog) return dog;
    else return (`The Dog with id ${id} does not exist on the DataBase`);
}

const getDogs = async () => {
    const dogs = await Dog.findAll({ include: [{ model: Temperament }] });

    let dogsFinal = [];
    dogs.forEach((dog) => {

        let temperament = dog.temperaments.map((temp) => {
            return temp.name;
        })

        let perro = {
            id: dog.id,
            image: dog.image,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            span: dog.span,
            temperament: temperament.join(', ')
        }

        dogsFinal.push(perro);
    })

    if (dogsFinal) return dogsFinal;
    else throw new Error('There are no Dogs on the DataBase yet. Try creating one')
};

const createDog = async (dog) => {

    let { name, image, height, weight, span, temperament } = dog

    // recibe la info enviada en un JSON ->
    const newDog = await Dog.create({ name, image, height, weight, span });

    // crea un array con los temperamentos enviados ->
    let tempArr = temperament.split(', ')

    // para cada temperamento lo agrega a la BDD y a la tabla intermedia
    tempArr.forEach(async temperament => {
        await newDog.addTemperaments(temperament, { through: Dogs_Temperaments })
    });
    return newDog;
}

module.exports = { getDogs, createDog, getDogById, findDogByName }