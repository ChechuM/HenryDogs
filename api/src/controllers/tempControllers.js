const { Temperament } = require('../db.js');
// import axios from "axios";
const axios = require('axios')

const checkTemperament = async (name) => {
    const temp = await Temperament.findOne({ where: { name } })
    if (temp) return false;
    else return true;
}

const saveTemperament = async (id, name) => {
    const temp = await Temperament.create({ id, name });
    return temp;
};

const loadTemperaments = async () => {
    axios.get('http://localhost:3001/temperaments')
    return
}

const getTemperaments = async () => {
    const temps = await Temperament.findAll();
    return temps
}

module.exports = {
    saveTemperament,
    checkTemperament,
    loadTemperaments,
    getTemperaments
};