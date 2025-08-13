import type { Movie, Series, Episode, Category, InsertMovie, InsertSeries, InsertEpisode, InsertCategory } from '../shared/schema.js';

export interface IStorage {
  // Movies
  getMovies(): Promise<Movie[]>;
  getMovie(id: number): Promise<Movie | null>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie | null>;
  deleteMovie(id: number): Promise<boolean>;
  getFeaturedMovies(): Promise<Movie[]>;
  searchMovies(query: string): Promise<Movie[]>;

  // Series
  getSeries(): Promise<Series[]>;
  getSeriesById(id: number): Promise<Series | null>;
  createSeries(series: InsertSeries): Promise<Series>;
  updateSeries(id: number, series: Partial<InsertSeries>): Promise<Series | null>;
  deleteSeries(id: number): Promise<boolean>;
  getFeaturedSeries(): Promise<Series[]>;
  searchSeries(query: string): Promise<Series[]>;

  // Episodes
  getEpisodesBySeriesId(seriesId: number): Promise<Episode[]>;
  getEpisode(id: number): Promise<Episode | null>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
  updateEpisode(id: number, episode: Partial<InsertEpisode>): Promise<Episode | null>;
  deleteEpisode(id: number): Promise<boolean>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | null>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | null>;
  deleteCategory(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private movies: Movie[] = [];
  private series: Series[] = [];
  private episodes: Episode[] = [];
  private categories: Category[] = [];
  private nextMovieId = 1;
  private nextSeriesId = 1;
  private nextEpisodeId = 1;
  private nextCategoryId = 1;

  // Movies
  async getMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async getMovie(id: number): Promise<Movie | null> {
    return this.movies.find(m => m.id === id) || null;
  }

  async createMovie(movie: InsertMovie): Promise<Movie> {
    const newMovie: Movie = {
      ...movie,
      id: this.nextMovieId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  async updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie | null> {
    const index = this.movies.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.movies[index] = {
      ...this.movies[index],
      ...movie,
      updatedAt: new Date(),
    };
    return this.movies[index];
  }

  async deleteMovie(id: number): Promise<boolean> {
    const index = this.movies.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    this.movies.splice(index, 1);
    return true;
  }

  async getFeaturedMovies(): Promise<Movie[]> {
    return this.movies.filter(m => m.featured);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const searchTerm = query.toLowerCase();
    return this.movies.filter(m => 
      m.title.toLowerCase().includes(searchTerm) ||
      m.titleAr.includes(searchTerm) ||
      m.description?.toLowerCase().includes(searchTerm) ||
      m.descriptionAr?.includes(searchTerm)
    );
  }

  // Series
  async getSeries(): Promise<Series[]> {
    return this.series;
  }

  async getSeriesById(id: number): Promise<Series | null> {
    return this.series.find(s => s.id === id) || null;
  }

  async createSeries(series: InsertSeries): Promise<Series> {
    const newSeries: Series = {
      ...series,
      id: this.nextSeriesId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.series.push(newSeries);
    return newSeries;
  }

  async updateSeries(id: number, series: Partial<InsertSeries>): Promise<Series | null> {
    const index = this.series.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.series[index] = {
      ...this.series[index],
      ...series,
      updatedAt: new Date(),
    };
    return this.series[index];
  }

  async deleteSeries(id: number): Promise<boolean> {
    const index = this.series.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.series.splice(index, 1);
    return true;
  }

  async getFeaturedSeries(): Promise<Series[]> {
    return this.series.filter(s => s.featured);
  }

  async searchSeries(query: string): Promise<Series[]> {
    const searchTerm = query.toLowerCase();
    return this.series.filter(s => 
      s.title.toLowerCase().includes(searchTerm) ||
      s.titleAr.includes(searchTerm) ||
      s.description?.toLowerCase().includes(searchTerm) ||
      s.descriptionAr?.includes(searchTerm)
    );
  }

  // Episodes
  async getEpisodesBySeriesId(seriesId: number): Promise<Episode[]> {
    return this.episodes.filter(e => e.seriesId === seriesId);
  }

  async getEpisode(id: number): Promise<Episode | null> {
    return this.episodes.find(e => e.id === id) || null;
  }

  async createEpisode(episode: InsertEpisode): Promise<Episode> {
    const newEpisode: Episode = {
      ...episode,
      id: this.nextEpisodeId++,
      createdAt: new Date(),
    };
    this.episodes.push(newEpisode);
    return newEpisode;
  }

  async updateEpisode(id: number, episode: Partial<InsertEpisode>): Promise<Episode | null> {
    const index = this.episodes.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    this.episodes[index] = {
      ...this.episodes[index],
      ...episode,
    };
    return this.episodes[index];
  }

  async deleteEpisode(id: number): Promise<boolean> {
    const index = this.episodes.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    this.episodes.splice(index, 1);
    return true;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategory(id: number): Promise<Category | null> {
    return this.categories.find(c => c.id === id) || null;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = {
      ...category,
      id: this.nextCategoryId++,
      createdAt: new Date(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | null> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.categories[index] = {
      ...this.categories[index],
      ...category,
    };
    return this.categories[index];
  }

  async deleteCategory(id: number): Promise<boolean> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.categories.splice(index, 1);
    return true;
  }
}

export const storage = new MemStorage();