const axios = require('axios');

async function getAstros() {
    const url = 'http://api.open-notify.org/astros.json';

    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch(err) {
        console.error("Erreur lors de la récupération de Astros':", err);
        throw new Error(`Impossible de récupérer Astros': ${err.message}`);
    }
}

module.exports = { getAstros };