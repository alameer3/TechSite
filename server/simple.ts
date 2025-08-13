import express from 'express';
import { storage } from './storage.js';

const app = express();
app.use(express.json());

// Basic routes to test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await storage.getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/api/series', async (req, res) => {
  try {
    const series = await storage.getSeries();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch series' });
  }
});

const port = 3001;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Simple server running at http://0.0.0.0:${port}`);
  
  // Add some sample data
  addSampleData();
});

async function addSampleData() {
  try {
    await storage.createMovie({
      title: 'The Dark Knight',
      titleAr: 'فارس الظلام',
      year: 2008,
      rating: '9.0',
      genre: ['أكشن', 'دراما'],
      director: 'Christopher Nolan',
      actors: ['Christian Bale', 'Heath Ledger'],
      duration: 152,
      featured: true,
    });
    
    await storage.createSeries({
      title: 'Breaking Bad',
      titleAr: 'بريكينغ باد',
      year: 2008,
      rating: '9.5',
      genre: ['دراما', 'إثارة'],
      actors: ['Bryan Cranston', 'Aaron Paul'],
      seasons: 5,
      episodes: 62,
      status: 'completed',
      featured: true,
    });
    
    console.log('✅ Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}