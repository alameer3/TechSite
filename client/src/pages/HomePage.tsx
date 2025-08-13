import { useQuery } from '@tanstack/react-query';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { Link } from 'wouter';
import type { Movie, Series } from '@shared/schema';

export default function HomePage() {
  const { data: featuredMovies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies/featured'],
  });

  const { data: featuredSeries, isLoading: seriesLoading } = useQuery<Series[]>({
    queryKey: ['/api/series/featured'],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg relative py-20 px-4 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            مرحباً بك في أكوام
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            الموقع العربي الأول لمشاهدة وتحميل الأفلام والمسلسلات العربية والأجنبية بأعلى جودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/movies">
              <button 
                data-testid="button-browse-movies"
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Play size={20} />
                تصفح الأفلام
              </button>
            </Link>
            <Link href="/series">
              <button 
                data-testid="button-browse-series"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                تصفح المسلسلات
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">الأفلام المميزة</h2>
            <Link href="/movies">
              <button 
                data-testid="link-view-all-movies"
                className="text-primary hover:underline"
              >
                عرض الكل
              </button>
            </Link>
          </div>

          {moviesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-[2/3] rounded-lg mb-2"></div>
                  <div className="bg-muted h-4 rounded mb-1"></div>
                  <div className="bg-muted h-3 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredMovies && featuredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredMovies.slice(0, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد أفلام مميزة حالياً</p>
              <Link href="/movies">
                <button 
                  data-testid="button-browse-all-movies"
                  className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  تصفح جميع الأفلام
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Series Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">المسلسلات المميزة</h2>
            <Link href="/series">
              <button 
                data-testid="link-view-all-series"
                className="text-primary hover:underline"
              >
                عرض الكل
              </button>
            </Link>
          </div>

          {seriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-[2/3] rounded-lg mb-2"></div>
                  <div className="bg-muted h-4 rounded mb-1"></div>
                  <div className="bg-muted h-3 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredSeries && featuredSeries.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredSeries.slice(0, 6).map((series) => (
                <SeriesCard key={series.id} series={series} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد مسلسلات مميزة حالياً</p>
              <Link href="/series">
                <button 
                  data-testid="button-browse-all-series"
                  className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  تصفح جميع المسلسلات
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">التصنيفات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'أفلام عربية', count: '500+', href: '/movies?genre=arabic' },
              { name: 'أفلام أجنبية', count: '1000+', href: '/movies?genre=foreign' },
              { name: 'مسلسلات عربية', count: '200+', href: '/series?genre=arabic' },
              { name: 'مسلسلات أجنبية', count: '300+', href: '/series?genre=foreign' },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <div 
                  data-testid={`category-${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
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

interface SeriesCardProps {
  series: Series;
}

function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Link href={`/series/${series.id}`}>
      <div 
        data-testid={`series-card-${series.id}`}
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
              <Play size={32} className="text-muted-foreground" />
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
        <h3 
          data-testid={`text-series-title-${series.id}`}
          className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors"
        >
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