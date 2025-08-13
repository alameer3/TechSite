import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { ArrowRight, Star, Calendar, Tv, Play, Download, Share2, User } from 'lucide-react';
import type { Series, Episode } from '@shared/schema';

export default function SeriesDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: series, isLoading: seriesLoading, error } = useQuery<Series>({
    queryKey: ['/api/series', id],
    enabled: !!id,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ['/api/series', id, 'episodes'],
    enabled: !!id && !!series,
  });

  if (seriesLoading) {
    return <SeriesDetailSkeleton />;
  }

  if (error || !series) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المسلسل غير موجود</h1>
          <p className="text-muted-foreground mb-4">المسلسل المطلوب غير متوفر أو تم حذفه</p>
          <Link href="/series">
            <button 
              data-testid="button-back-to-series"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              العودة إلى المسلسلات
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Group episodes by season
  const episodesBySeason = episodes?.reduce((acc, episode) => {
    const season = episode.season;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {} as Record<number, Episode[]>) || {};

  const seasons = Object.keys(episodesBySeason).map(Number).sort((a, b) => a - b);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {series.posterUrl ? (
          <img
            src={series.posterUrl}
            alt={series.titleAr}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Tv size={64} className="text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link href="/series">
              <button 
                data-testid="button-back"
                className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-colors"
              >
                <ArrowRight size={20} />
                العودة إلى المسلسلات
              </button>
            </Link>
            
            <h1 
              data-testid={`text-series-title-${series.id}`}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {series.titleAr}
            </h1>
            
            {series.title !== series.titleAr && (
              <p className="text-xl text-white/80 mb-4">{series.title}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {series.rating && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>{series.rating}</span>
                </div>
              )}
              {series.year && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Calendar size={16} />
                  <span>{series.year}</span>
                </div>
              )}
              {series.seasons && (
                <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full">
                  <Tv size={16} />
                  <span>{series.seasons} {series.seasons === 1 ? 'موسم' : 'مواسم'}</span>
                </div>
              )}
              {series.status && (
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  series.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {series.status === 'completed' ? 'مكتمل' : 'جاري العرض'}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                data-testid="button-play-series"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                <Play size={20} />
                مشاهدة الآن
              </button>
              <button 
                data-testid="button-download-series"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                تحميل
              </button>
              <button 
                data-testid="button-share-series"
                className="border-2 border-white text-white px-4 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Series Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            {series.descriptionAr && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">القصة</h2>
                <p 
                  data-testid={`text-series-description-${series.id}`}
                  className="text-muted-foreground leading-relaxed"
                >
                  {series.descriptionAr}
                </p>
              </div>
            )}

            {/* Episodes by Season */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">الحلقات</h2>
              
              {episodesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-6 bg-muted rounded w-32 mb-2" />
                      <div className="space-y-2">
                        <div className="h-16 bg-muted rounded" />
                        <div className="h-16 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : seasons.length > 0 ? (
                <div className="space-y-6">
                  {seasons.map((season) => (
                    <div key={season} className="bg-card border border-border rounded-lg p-4">
                      <h3 
                        data-testid={`text-season-${series.id}-${season}`}
                        className="text-lg font-semibold text-foreground mb-4"
                      >
                        الموسم {season}
                      </h3>
                      <div className="space-y-2">
                        {episodesBySeason[season]
                          .sort((a, b) => a.episode - b.episode)
                          .map((episode) => (
                          <EpisodeCard key={episode.id} episode={episode} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">لا توجد حلقات متاحة حالياً</p>
                </div>
              )}
            </div>

            {/* Cast */}
            {series.actors && series.actors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">الممثلون</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {series.actors.slice(0, 6).map((actor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p 
                          data-testid={`text-actor-${series.id}-${index}`}
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">معلومات المسلسل</h3>
              
              <div className="space-y-4">
                {series.genre && series.genre.length > 0 && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">النوع</dt>
                    <dd className="flex flex-wrap gap-2">
                      {series.genre.map((g) => (
                        <span 
                          key={g} 
                          data-testid={`genre-${series.id}-${g}`}
                          className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {g}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                
                {series.language && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">اللغة</dt>
                    <dd 
                      data-testid={`text-language-${series.id}`}
                      className="text-foreground"
                    >
                      {series.language}
                    </dd>
                  </div>
                )}
                
                <div className="border-t border-border pt-4 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {series.rating || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">التقييم</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {series.year || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">السنة</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center mt-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {series.seasons || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">مواسم</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {series.episodes || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">حلقات</div>
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

interface EpisodeCardProps {
  episode: Episode;
}

function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <div 
      data-testid={`episode-card-${episode.id}`}
      className="bg-background border border-input rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
          {episode.thumbnailUrl ? (
            <img
              src={episode.thumbnailUrl}
              alt={episode.titleAr}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Play size={16} className="text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Play size={16} className="text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 
            data-testid={`text-episode-title-${episode.id}`}
            className="font-medium text-foreground text-sm mb-1 truncate"
          >
            الحلقة {episode.episode}: {episode.titleAr}
          </h4>
          
          {episode.description && (
            <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
              {episode.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {episode.duration && (
              <span>{episode.duration} د</span>
            )}
            {episode.quality && (
              <span className="bg-primary/20 text-primary px-1 rounded">
                {episode.quality}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeriesDetailSkeleton() {
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