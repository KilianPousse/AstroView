const express = require('express');
const cors = require('cors');

// Import du fichier externe
const { getMeteo } = require('./api/meteo');
const { fetchAPOD } = require('./api/apod');

const app = express();
const port = 3080;

app.use(cors());

// Endpoint API pour récupérer la météo
app.get("/meteo", async (req, res) => {
    // Récupération des paramètres lat et lon depuis la query string
    const { lat, lon } = req.query; 

    // Vérifier si lat et lon sont présents
    if(!lat || !lon) {
        return res.status(400).json({ error: 'Latitude et longitude sont requis.' });
    }

    try {
        const meteoData = await getMeteo(lat, lon);
        res.json(meteoData);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint API pour récupérer l'APOD
app.get("/apod", async (req, res) => {
    try {
        const apodData = await fetchAPOD();
        res.json(apodData);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
