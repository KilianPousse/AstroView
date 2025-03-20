const axios = require('axios');

async function getISS() {
    const url = 'http://api.open-notify.org/iss-now.json';

    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch(err) {
        console.error("Erreur lors de la récupération de l'ISS':", err);
        throw new Error(`Impossible de récupérer l'ISS': ${err.message}`);
    }
}

module.exports = { getISS };