const axios = require('axios');

async function getMeteo(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch(err) {
        console.error("Erreur lors de la récupération de la météo:", err);
        throw new Error(`Impossible de récupérer la météo: ${err.message}`);
    }
}

module.exports = { getMeteo };
