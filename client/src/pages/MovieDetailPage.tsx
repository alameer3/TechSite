import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { ArrowRight, Star, Calendar, Clock, Play, Download, Share2, User } from 'lucide-react';
import type { Movie } from '@shared/schema';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: movie, isLoading, error } = useQuery<Movie>({
    queryKey: ['/api/movies', id],
    enabled: !!id,
  });

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">الفيلم غير موجود</h1>
          <p className="text-muted-foreground mb-4">الفيلم المطلوب غير متوفر أو تم حذفه</p>
          <Link href="/movies">
            <button 
              data-testid="button-back-to-movies"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              العودة إلى الأفلام
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.titleAr}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Play size={64} className="text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link href="/movies">
              <button 
                data-testid="button-back"
                className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-colors"
              >
                <ArrowRight size={20} />
                العودة إلى الأفلام
              </button>
            </Link>
            
            <h1 
              data-testid={`text-movie-title-${movie.id}`}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {movie.titleAr}
            </h1>
            
            {movie.title !== movie.titleAr && (
              <p className="text-xl text-white/80 mb-4">{movie.title}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {movie.rating && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}</span>
                </div>
              )}
              {movie.year && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Calendar size={16} />
                  <span>{movie.year}</span>
                </div>
              )}
              {movie.duration && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Clock size={16} />
                  <span>{movie.duration} دقيقة</span>
                </div>
              )}
              {movie.quality && (
                <div className="bg-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.quality}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                data-testid="button-play-movie"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                <Play size={20} />
                مشاهدة الآن
              </button>
              <button 
                data-testid="button-download-movie"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                تحميل
              </button>
              <button 
                data-testid="button-share-movie"
                className="border-2 border-white text-white px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            {movie.descriptionAr && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">القصة</h2>
                <p 
                  data-testid={`text-movie-description-${movie.id}`}
                  className="text-muted-foreground leading-relaxed"
                >
                  {movie.descriptionAr}
                </p>
              </div>
            )}

            {/* Trailer */}
            {movie.trailerUrl && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">الإعلان</h2>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full h-full"
                    poster={movie.posterUrl || undefined}
                  >
                    <source src={movie.trailerUrl} type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              </div>
            )}

            {/* Cast and Crew */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {movie.director && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">المخرج</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <User size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p 
                        data-testid={`text-movie-director-${movie.id}`}
                        className="font-medium text-foreground"
                      >
                        {movie.director}
                      </p>
                      <p className="text-sm text-muted-foreground">مخرج</p>
                    </div>
                  </div>
                </div>
              )}

              {movie.actors && movie.actors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">الممثلون</h3>
                  <div className="space-y-3">
                    {movie.actors.slice(0, 3).map((actor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p 
                            data-testid={`text-actor-${movie.id}-${index}`}
                            className="font-medium text-foreground"
                          >
                            {actor}
                          </p>
                          <p className="text-sm text-muted-foreground">ممثل</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">معلومات الفيلم</h3>
              
              <div className="space-y-4">
                {movie.genre && movie.genre.length > 0 && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">النوع</dt>
                    <dd className="flex flex-wrap gap-2">
                      {movie.genre.map((g) => (
                        <span 
                          key={g} 
                          data-testid={`genre-${movie.id}-${g}`}
                          className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {g}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                
                {movie.language && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">اللغة</dt>
                    <dd 
                      data-testid={`text-language-${movie.id}`}
                      className="text-foreground"
                    >
                      {movie.language}
                    </dd>
                  </div>
                )}
                
                {movie.subtitles && movie.subtitles.length > 0 && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">الترجمة</dt>
                    <dd className="text-foreground">
                      {movie.subtitles.join(', ')}
                    </dd>
                  </div>
                )}
                
                <div className="border-t border-border pt-4 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {movie.rating || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">التقييم</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {movie.year || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">السنة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-96 md:h-[500px] bg-muted animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4 w-1/4" />
              <div className="space-y-2 mb-8">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
              <div className="h-64 bg-muted rounded mb-8" />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-muted rounded mb-4 w-1/2" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}