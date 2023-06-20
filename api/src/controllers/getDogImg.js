const axios = require('axios');
const { API_KEY } = process.env;
const URLimg = "https://api.thedogapi.com/v1/images/";
const headers = {
    headers: {
        "x-api-key": API_KEY,
    },
};

const getDogImg = async (id) => {
    if (!id) return 'weeee loco qué día choto';
    const { data } = await axios(URLimg + id, headers);
    const { url } = data;
    return url;
}

module.exports = { getDogImg }