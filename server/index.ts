import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { setupVite, serveStatic, log } from './vite.js';
import { routes } from './routes.js';
import { seedData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api', routes);

// Serve client files (for now, we'll use a simple static setup)
app.use(express.static('client/dist'));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile('client/dist/index.html', { root: process.cwd() });
  }
});

const port = Number(process.env.PORT) || 3001;

server.listen(port, '0.0.0.0', async () => {
  console.log(`🚀 Server running at http://0.0.0.0:${port}`);
  
  // Seed data on startup for development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await seedData();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
});