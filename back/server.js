const express = require('express');
const cors = require('cors');

// Import du fichier externe
const { fetchAPOD } = require('./service/apod'); 

const app = express();
const port = 3080;

app.use(cors({
    origin: 'http://localhost:4200' 
}));

// Endpoint API pour récupérer l'APOD
app.get("/apod", async (req, res) => {
    try {
        const apodData = await fetchAPOD();
        res.json(apodData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
