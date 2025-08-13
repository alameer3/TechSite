import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

// Basic middleware
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'أكوام كلون - API Working!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Sample movies data
const sampleMovies = [
  {
    id: 1,
    title: 'The Dark Knight',
    titleAr: 'فارس الظلام',
    year: 2008,
    rating: '9.0',
    genre: ['أكشن', 'دراما', 'إثارة'],
    director: 'Christopher Nolan',
    actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    duration: 152,
    featured: true,
  },
  {
    id: 2,
    title: 'Inception',
    titleAr: 'البداية', 
    year: 2010,
    rating: '8.8',
    genre: ['أكشن', 'خيال علمي', 'إثارة'],
    director: 'Christopher Nolan',
    actors: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    duration: 148,
    featured: true,
  }
];

const sampleSeries = [
  {
    id: 1,
    title: 'Breaking Bad',
    titleAr: 'بريكينغ باد',
    year: 2008,
    rating: '9.5',
    genre: ['دراما', 'إثارة', 'جريمة'],
    actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    seasons: 5,
    episodes: 62,
    status: 'completed',
    featured: true,
  }
];

// API routes
app.get('/api/movies', (req, res) => {
  res.json(sampleMovies);
});

app.get('/api/movies/featured', (req, res) => {
  res.json(sampleMovies.filter(movie => movie.featured));
});

app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = sampleMovies.find(m => m.id === id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

app.get('/api/series', (req, res) => {
  res.json(sampleSeries);
});

app.get('/api/series/featured', (req, res) => {
  res.json(sampleSeries.filter(series => series.featured));
});

app.get('/api/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const series = sampleSeries.find(s => s.id === id);
  if (!series) {
    return res.status(404).json({ error: 'Series not found' });
  }
  res.json(series);
});

app.get('/api/search', (req, res) => {
  const query = req.query.q?.toString().toLowerCase() || '';
  const movies = sampleMovies.filter(movie => 
    movie.title.toLowerCase().includes(query) || 
    movie.titleAr.includes(query)
  );
  const series = sampleSeries.filter(s => 
    s.title.toLowerCase().includes(query) || 
    s.titleAr.includes(query)
  );
  
  res.json({
    movies,
    series,
    total: movies.length + series.length
  });
});

const port = Number(process.env.PORT) || 3001;

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 أكوام كلون API Server running at http://0.0.0.0:${port}`);
  console.log(`📱 Test API: http://0.0.0.0:${port}/api/test`);
  console.log(`🎬 Movies: http://0.0.0.0:${port}/api/movies`);
  console.log(`📺 Series: http://0.0.0.0:${port}/api/series`);
});