import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// If Vercel env, use /tmp, else use project root directory
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL;
const DB_FILE = isVercel ? '/tmp/leaderboard.json' : path.join(process.cwd(), 'leaderboard.json');

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    // Write empty array if not exists
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

// For Vercel, it requires the module to be exported
export default app;

// For local development, listen on the port
// If process.env.VERCEL is not set, we assume local or a different Node runner
if (!isVercel) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Leaderboard API running on http://localhost:${PORT}`);
    });
}
