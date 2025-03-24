const express = require('express');
const cors = require('cors');

// Import du fichier externe
const { getMeteo } = require('./back/api/meteo');
const { fetchAPOD } = require('./back/api/apod');
const { getAstros } = require('./back/api/astros')
const { getCelesTrak } = require('./back/api/celestrak');
const { getCelestialNavigation } = require('./back/api/usno');

const app = express();
const port = 3080;

app.use(cors());

// Endpoint API pour récupérer la météo
app.get("/meteo", async (req, res) => {
    // Récupération des paramètres lat et lon depuis la query string
    const { lat, lon } = req.query;

    // Vérifier si lat et lon sont présents
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude et longitude sont requis.' });
    }

    try {
        const meteoData = await getMeteo(lat, lon);
        res.json(meteoData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint API pour récupérer l'APOD
app.get("/apod", async (req, res) => {
    try {
        const apodData = await fetchAPOD();
        res.json(apodData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint API pour récupérer Astros
app.get("/astros", async (req, res) => {
    try {
        const astrosData = await getAstros();
        res.json(astrosData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/celestrak", async (req, res) => {
    const { id } = req.query;

    // Vérifier si lat et lon sont présents
    if (!id) {
        return res.status(400).json({ error: 'L\'id du satellite est requis.' });
    }

    try {
        const tleData = await getCelesTrak(id);

        if (tleData.length < 3) {
            return res.status(404).json({ error: 'Satellite inconnu.' });
        }

        res.json({ name: tleData[0], tle1: tleData[1], tle2: tleData[2] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/usno", async (req, res) => {
    const { date, time, lat, lon } = req.query;

    // Vérifier si lat et lon sont présents
    if (!date || !time || !lat || !lon) {
        return res.status(400).json({ error: 'Date, heure, latitude et longitude sont requis.' });
    }

    try {
        const celestialData = await getCelestialNavigation(date, time, lat, lon);

        console.log("Donné du USNO : ", res.json(celestialData));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
