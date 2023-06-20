const { Temperament } = require('../db.js');

const checkTemperament = async (name) => {
    const temp = await Temperament.findOne({ where: { name } })
    if (temp) return false;
    else return true;
}

const saveTemperament = async (id, name) => {
    const temp = await Temperament.create({ id, name });
    return temp;
};

module.exports = {
    saveTemperament,
    checkTemperament
};