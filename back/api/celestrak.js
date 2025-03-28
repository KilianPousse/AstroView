const axios = require('axios');

async function getCelesTrak(id) {
    const url = `https://celestrak.org/NORAD/elements/gp.php?CATNR=${id}&FORMAT=TLE`;

    try {
        const resp = await axios.get(url);
        console.log("value :", resp.data.trim().split('\n'))
        return resp.data.trim().split('\n');
    }   
    catch(err) {
        console.error('Erreur lors de la recuperation de celestrak:', err);
        throw new Error('Impossible de recuperer les infos du satellite: ', err.message);
    }
}

module.exports = { getCelesTrak }