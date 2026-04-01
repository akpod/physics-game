import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'leaderboard.json');

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

app.get('/api/leaderboard', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        res.json(data);
    } catch (e) {
        res.json([]);
    }
});

app.post('/api/leaderboard', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        const newEntry = req.body; // { name, time, stars }
        
        const existingIndex = data.findIndex(d => d.name === newEntry.name);
        if (existingIndex > -1) {
           // We only update if the new total time is better, or if stars are higher
           const cur = data[existingIndex];
           if (newEntry.stars > cur.stars || (newEntry.stars === cur.stars && newEntry.time < cur.time)) {
               data[existingIndex] = newEntry;
           }
        } else {
           data.push(newEntry);
        }
        
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: 'Failed' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Leaderboard API running on http://localhost:${PORT}`);
});
