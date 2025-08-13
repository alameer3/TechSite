import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Movies table
export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  titleAr: text('title_ar').notNull(),
  description: text('description'),
  descriptionAr: text('description_ar'),
  posterUrl: text('poster_url'),
  trailerUrl: text('trailer_url'),
  year: integer('year'),
  rating: text('rating'),
  genre: text('genre').array(),
  director: text('director'),
  actors: text('actors').array(),
  duration: integer('duration'),
  quality: text('quality').default('HD'),
  language: text('language').default('Arabic'),
  subtitles: text('subtitles').array().default([]),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// TV Series table
export const series = pgTable('series', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  titleAr: text('title_ar').notNull(),
  description: text('description'),
  descriptionAr: text('description_ar'),
  posterUrl: text('poster_url'),
  year: integer('year'),
  rating: text('rating'),
  genre: text('genre').array(),
  actors: text('actors').array(),
  seasons: integer('seasons'),
  episodes: integer('episodes'),
  status: text('status').default('ongoing'), // ongoing, completed
  language: text('language').default('Arabic'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Episodes table
export const episodes = pgTable('episodes', {
  id: serial('id').primaryKey(),
  seriesId: integer('series_id').references(() => series.id),
  title: text('title').notNull(),
  titleAr: text('title_ar').notNull(),
  season: integer('season').notNull(),
  episode: integer('episode').notNull(),
  description: text('description'),
  duration: integer('duration'),
  videoUrl: text('video_url'),
  thumbnailUrl: text('thumbnail_url'),
  quality: text('quality').default('HD'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameAr: text('name_ar').notNull(),
  type: text('type').notNull(), // movie, series, game, app
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Insert schemas
export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSeriesSchema = createInsertSchema(series).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEpisodeSchema = createInsertSchema(episodes).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type InsertSeries = z.infer<typeof insertSeriesSchema>;
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Movie = typeof movies.$inferSelect;
export type Series = typeof series.$inferSelect;
export type Episode = typeof episodes.$inferSelect;
export type Category = typeof categories.$inferSelect;