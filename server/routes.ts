import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage.js';
import { insertMovieSchema, insertSeriesSchema, insertEpisodeSchema, insertCategorySchema } from '../shared/schema.js';

export const routes = Router();

// Movies routes
routes.get('/movies', async (req, res) => {
  try {
    const movies = await storage.getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

routes.get('/movies/featured', async (req, res) => {
  try {
    const movies = await storage.getFeaturedMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured movies' });
  }
});

routes.get('/movies/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const movies = await storage.searchMovies(q);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

routes.get('/movies/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const movie = await storage.getMovie(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

routes.post('/movies', async (req, res) => {
  try {
    const validatedData = insertMovieSchema.parse(req.body);
    const movie = await storage.createMovie(validatedData);
    res.status(201).json(movie);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid movie data', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Series routes
routes.get('/series', async (req, res) => {
  try {
    const series = await storage.getSeries();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch series' });
  }
});

routes.get('/series/featured', async (req, res) => {
  try {
    const series = await storage.getFeaturedSeries();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured series' });
  }
});

routes.get('/series/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const series = await storage.searchSeries(q);
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search series' });
  }
});

routes.get('/series/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid series ID' });
    }
    const series = await storage.getSeriesById(id);
    if (!series) {
      return res.status(404).json({ error: 'Series not found' });
    }
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch series' });
  }
});

routes.get('/series/:id/episodes', async (req, res) => {
  try {
    const seriesId = parseInt(req.params.id);
    if (isNaN(seriesId)) {
      return res.status(400).json({ error: 'Invalid series ID' });
    }
    const episodes = await storage.getEpisodesBySeriesId(seriesId);
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

routes.post('/series', async (req, res) => {
  try {
    const validatedData = insertSeriesSchema.parse(req.body);
    const series = await storage.createSeries(validatedData);
    res.status(201).json(series);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid series data', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to create series' });
  }
});

// Episodes routes
routes.get('/episodes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid episode ID' });
    }
    const episode = await storage.getEpisode(id);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch episode' });
  }
});

routes.post('/episodes', async (req, res) => {
  try {
    const validatedData = insertEpisodeSchema.parse(req.body);
    const episode = await storage.createEpisode(validatedData);
    res.status(201).json(episode);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid episode data', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to create episode' });
  }
});

// Categories routes
routes.get('/categories', async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

routes.get('/categories/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }
    const category = await storage.getCategory(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

routes.post('/categories', async (req, res) => {
  try {
    const validatedData = insertCategorySchema.parse(req.body);
    const category = await storage.createCategory(validatedData);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid category data', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to create category' });
  }
});