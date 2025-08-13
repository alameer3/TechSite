import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Grid, List, Star, Calendar, Clock, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Movie } from '@shared/schema';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'title'>('newest');

  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
  });

  // Filter and sort movies
  const filteredMovies = movies?.filter((movie) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.titleAr.includes(query) ||
      movie.description?.toLowerCase().includes(query) ||
      movie.descriptionAr?.includes(query)
    );
  }) || [];

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (new Date(b.createdAt!)).getTime() - (new Date(a.createdAt!)).getTime();
      case 'oldest':
        return (new Date(a.createdAt!)).getTime() - (new Date(b.createdAt!)).getTime();
      case 'rating':
        return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      case 'title':
        return a.titleAr.localeCompare(b.titleAr, 'ar');
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">الأفلام</h1>
        <p className="text-muted-foreground">اكتشف مجموعة واسعة من الأفلام العربية والأجنبية</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="البحث في الأفلام..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="search-movies"
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              data-testid="sort-movies"
              className="bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="title">الاسم</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center border border-input rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              data-testid="view-grid"
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              data-testid="view-list"
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1'} gap-4`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              {viewMode === 'grid' ? (
                <>
                  <div className="bg-muted aspect-[2/3] rounded-lg mb-2"></div>
                  <div className="bg-muted h-4 rounded mb-1"></div>
                  <div className="bg-muted h-3 rounded w-2/3"></div>
                </>
              ) : (
                <div className="bg-card border border-border rounded-lg p-4 flex gap-4">
                  <div className="bg-muted w-24 h-36 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="bg-muted h-6 rounded mb-2"></div>
                    <div className="bg-muted h-4 rounded mb-2"></div>
                    <div className="bg-muted h-4 rounded w-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : sortedMovies.length > 0 ? (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            عُثر على {sortedMovies.length} فيلم
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedMovies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchQuery ? 'لم يتم العثور على أفلام تطابق بحثك' : 'لا توجد أفلام متاحة حالياً'}
          </p>
        </div>
      )}
    </div>
  );
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div 
        data-testid={`movie-card-${movie.id}`}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.titleAr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Play size={32} className="text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play size={32} className="text-white" />
          </div>
          {movie.rating && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </div>
          )}
        </div>
        <h3 
          data-testid={`text-movie-title-${movie.id}`}
          className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors"
        >
          {movie.titleAr}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {movie.year && (
            <div className="flex items-center gap-1">
              <Calendar size={10} />
              {movie.year}
            </div>
          )}
          {movie.duration && (
            <div className="flex items-center gap-1">
              <Clock size={10} />
              {movie.duration} د
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function MovieListItem({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div 
        data-testid={`movie-list-${movie.id}`}
        className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group"
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.titleAr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Play size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              data-testid={`text-movie-title-list-${movie.id}`}
              className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
            >
              {movie.titleAr}
            </h3>
            
            {movie.descriptionAr && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {movie.descriptionAr}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {movie.year && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {movie.year}
                </div>
              )}
              {movie.duration && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {movie.duration} دقيقة
                </div>
              )}
              {movie.rating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {movie.rating}
                </div>
              )}
              {movie.quality && (
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                  {movie.quality}
                </span>
              )}
            </div>
            
            {movie.genre && movie.genre.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.genre.slice(0, 3).map((g) => (
                  <span key={g} className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}