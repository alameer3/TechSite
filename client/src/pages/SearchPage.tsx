import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { Search, Filter, Grid, List, Star, Calendar, Clock, Play, Tv } from 'lucide-react';
import type { Movie, Series } from '@shared/schema';

export default function SearchPage() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<'all' | 'movies' | 'series'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location]);

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies/search', { q: searchQuery }],
    enabled: !!searchQuery && (contentType === 'all' || contentType === 'movies'),
  });

  const { data: series, isLoading: seriesLoading } = useQuery<Series[]>({
    queryKey: ['/api/series/search', { q: searchQuery }],
    enabled: !!searchQuery && (contentType === 'all' || contentType === 'series'),
  });

  const isLoading = moviesLoading || seriesLoading;
  const hasResults = (movies && movies.length > 0) || (series && series.length > 0);
  const totalResults = (movies?.length || 0) + (series?.length || 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">البحث</h1>
        <p className="text-muted-foreground">ابحث في مكتبة الأفلام والمسلسلات</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="ابحث عن أفلام ومسلسلات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input-main"
            className="w-full pl-12 pr-4 py-4 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-lg"
          />
          <button
            type="submit"
            data-testid="button-search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            بحث
          </button>
        </div>
      </form>

      {searchQuery && (
        <>
          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              {/* Content Type Filter */}
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as any)}
                  data-testid="filter-content-type"
                  className="bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">جميع المحتويات</option>
                  <option value="movies">الأفلام فقط</option>
                  <option value="series">المسلسلات فقط</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {isLoading ? 'جاري البحث...' : `${totalResults} نتيجة`}
                </span>
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
          </div>

          {/* Search Results */}
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
          ) : hasResults ? (
            <div className="space-y-8">
              {/* Movies Section */}
              {movies && movies.length > 0 && (contentType === 'all' || contentType === 'movies') && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      الأفلام ({movies.length})
                    </h2>
                    {contentType === 'all' && (
                      <button
                        onClick={() => setContentType('movies')}
                        data-testid="button-view-all-movies"
                        className="text-primary hover:underline text-sm"
                      >
                        عرض الكل
                      </button>
                    )}
                  </div>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {(contentType === 'all' ? movies.slice(0, 6) : movies).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(contentType === 'all' ? movies.slice(0, 3) : movies).map((movie) => (
                        <MovieListItem key={movie.id} movie={movie} />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Series Section */}
              {series && series.length > 0 && (contentType === 'all' || contentType === 'series') && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      المسلسلات ({series.length})
                    </h2>
                    {contentType === 'all' && (
                      <button
                        onClick={() => setContentType('series')}
                        data-testid="button-view-all-series"
                        className="text-primary hover:underline text-sm"
                      >
                        عرض الكل
                      </button>
                    )}
                  </div>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {(contentType === 'all' ? series.slice(0, 6) : series).map((s) => (
                        <SeriesCard key={s.id} series={s} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(contentType === 'all' ? series.slice(0, 3) : series).map((s) => (
                        <SeriesListItem key={s.id} series={s} />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  لم يتم العثور على نتائج
                </h3>
                <p className="text-muted-foreground">
                  لم نجد أي محتوى يطابق بحثك عن "{searchQuery}"
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/movies">
                  <button 
                    data-testid="button-browse-movies"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    تصفح الأفلام
                  </button>
                </Link>
                <Link href="/series">
                  <button 
                    data-testid="button-browse-series"
                    className="border border-input px-6 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    تصفح المسلسلات
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Reuse components from other pages
interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div 
        data-testid={`search-movie-card-${movie.id}`}
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
        <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
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
        data-testid={`search-movie-list-${movie.id}`}
        className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group"
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.titleAr}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Play size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {movie.titleAr}
              </h3>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs">
                فيلم
              </span>
            </div>
            
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface SeriesCardProps {
  series: Series;
}

function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Link href={`/series/${series.id}`}>
      <div 
        data-testid={`search-series-card-${series.id}`}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
          {series.posterUrl ? (
            <img
              src={series.posterUrl}
              alt={series.titleAr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Tv size={32} className="text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play size={32} className="text-white" />
          </div>
          {series.rating && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {series.rating}
            </div>
          )}
        </div>
        <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {series.titleAr}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {series.year && (
            <div className="flex items-center gap-1">
              <Calendar size={10} />
              {series.year}
            </div>
          )}
          {series.seasons && (
            <div>
              {series.seasons} مواسم
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function SeriesListItem({ series }: SeriesCardProps) {
  return (
    <Link href={`/series/${series.id}`}>
      <div 
        data-testid={`search-series-list-${series.id}`}
        className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group"
      >
        <div className="flex gap-4">
          <div className="relative w-24 h-36 rounded-lg overflow-hidden flex-shrink-0">
            {series.posterUrl ? (
              <img
                src={series.posterUrl}
                alt={series.titleAr}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Tv size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {series.titleAr}
              </h3>
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 px-2 py-1 rounded text-xs">
                مسلسل
              </span>
            </div>
            
            {series.descriptionAr && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {series.descriptionAr}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {series.year && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {series.year}
                </div>
              )}
              {series.seasons && (
                <div className="flex items-center gap-1">
                  <Tv size={14} />
                  {series.seasons} مواسم
                </div>
              )}
              {series.rating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {series.rating}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}