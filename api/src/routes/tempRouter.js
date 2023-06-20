const { Router } = require('express');
const tempRouter = Router();
const { saveTemperament, checkTemperament } = require('../controllers/tempControllers');
const axios = require('axios');
const { API_KEY } = process.env;
const URLbreeds = "https://api.thedogapi.com/v1/breeds"
const headers = {
    headers: {
        "x-api-key": API_KEY,
    },
};


// 📍 GET | /temperaments
// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
tempRouter.get('/', async (req, res) => {
    try {
        await axios.get(URLbreeds, headers)
            .then((response) => {
                let data = response.data;
                return data;
            })
            .then((data) => {
                let allTemps = [];
                data.forEach((breed) => {
                    if (breed.temperament) {
                        let arrTemp = breed.temperament.split(', ')
                        arrTemp.forEach((temp) => {
                            if (!allTemps.includes(temp)) allTemps.push(temp)
                        })
                    }
                })
                return allTemps;
            })
            .then((allTemps) => {
                let id = 0;
                allTemps.forEach(async (temp) => {
                    let isUnique = checkTemperament(temp);
                    if (isUnique) {
                        id++;
                        return await saveTemperament(id, temp)
                    }
                    else return res.status(200).json('Temp already in DataBase')
                })
                res.status(200).json(allTemps)
            });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = { tempRouter }
