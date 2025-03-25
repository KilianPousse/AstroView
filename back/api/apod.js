const axios = require('axios');

const apiKey = /* Cle API */;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function fetchAPOD() {
    try {
        const response = await axios.get(apiUrl);
        return response.data; // Retourne les données de l'API
    } catch (error) {
        console.error("Erreur lors de la récupération de l'APOD :", error);
        throw new Error("Impossible de récupérer l'image APOD.");
    }
}

module.exports = { fetchAPOD };
