const axios = require('axios');


async function getCelestialNavigation(date, time, lat, lon) {

    const coords = `${lat},${lon}`;
    const url = `https://aa.usno.navy.mil/api/celnav?date=${date}&time=${time}&coords=${coords}`;



    try {
        const response = await axios.get(url);
        console.log("Données de navigation céleste récupérées avec succès :", url);
        return response.data;
    }
    catch (err) {
        console.error("Erreur lors de la récupération des données de navigation':", err);
        throw new Error(`Impossible de récupérer USNO': ${err.message}`);
    }
}

module.exports = { getCelestialNavigation };