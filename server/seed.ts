import { storage } from './storage.js';
import type { InsertMovie, InsertSeries, InsertEpisode, InsertCategory } from '../shared/schema.js';

// Sample data for testing
export async function seedData() {
  console.log('🌱 Seeding database with sample data...');

  // Sample categories
  const categories: InsertCategory[] = [
    { name: 'Action', nameAr: 'أكشن', type: 'movie', icon: '🎬' },
    { name: 'Drama', nameAr: 'دراما', type: 'movie', icon: '🎭' },
    { name: 'Comedy', nameAr: 'كوميدي', type: 'movie', icon: '😂' },
    { name: 'Romance', nameAr: 'رومانسي', type: 'movie', icon: '💕' },
    { name: 'Thriller', nameAr: 'إثارة', type: 'movie', icon: '🔥' },
  ];

  for (const category of categories) {
    await storage.createCategory(category);
  }

  // Sample movies
  const movies: InsertMovie[] = [
    {
      title: 'The Dark Knight',
      titleAr: 'فارس الظلام',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      descriptionAr: 'عندما يعيث الجوكر فساداً وفوضى في مدينة جوثام، يجب على باتمان أن يخوض واحداً من أعظم الاختبارات النفسية والجسدية لقدرته على محاربة الظلم.',
      year: 2008,
      rating: '9.0',
      genre: ['أكشن', 'دراما', 'إثارة'],
      director: 'Christopher Nolan',
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      duration: 152,
      quality: 'HD',
      language: 'English',
      subtitles: ['Arabic'],
      featured: true,
    },
    {
      title: 'Inception',
      titleAr: 'البداية',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      descriptionAr: 'لص يسرق أسرار الشركات من خلال تقنية تبادل الأحلام، يُكلف بمهمة معاكسة وهي زرع فكرة في عقل رئيس تنفيذي.',
      year: 2010,
      rating: '8.8',
      genre: ['أكشن', 'خيال علمي', 'إثارة'],
      director: 'Christopher Nolan',
      actors: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
      duration: 148,
      quality: 'HD',
      language: 'English',
      subtitles: ['Arabic'],
      featured: true,
    },
    {
      title: 'The Shawshank Redemption',
      titleAr: 'الخلاص من شاوشانك',
      description: 'Two imprisoned mates bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      descriptionAr: 'صديقان مسجونان يتآلفان على مدى عدة سنوات، يجدان العزاء والخلاص النهائي من خلال أعمال اللطف المشتركة.',
      year: 1994,
      rating: '9.3',
      genre: ['دراما'],
      director: 'Frank Darabont',
      actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      duration: 142,
      quality: 'HD',
      language: 'English',
      subtitles: ['Arabic'],
      featured: true,
    },
    {
      title: 'Parasite',
      titleAr: 'الطفيلي',
      description: 'A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.',
      descriptionAr: 'عائلة فقيرة تخطط للعمل لدى عائلة ثرية عن طريق التسلل إلى منزلهم والتظاهر بأنهم أفراد غير مرتبطين وذوي مؤهلات عالية.',
      year: 2019,
      rating: '8.5',
      genre: ['دراما', 'إثارة', 'كوميدي'],
      director: 'Bong Joon-ho',
      actors: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
      duration: 132,
      quality: 'HD',
      language: 'Korean',
      subtitles: ['Arabic', 'English'],
      featured: false,
    },
  ];

  for (const movie of movies) {
    await storage.createMovie(movie);
  }

  // Sample series
  const seriesList: InsertSeries[] = [
    {
      title: 'Breaking Bad',
      titleAr: 'بريكينغ باد',
      description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his familys future.',
      descriptionAr: 'أستاذ كيمياء في المدرسة الثانوية يُشخص بسرطان رئة لا يمكن علاجه، فيتحول إلى تصنيع وبيع المخدرات لتأمين مستقبل عائلته.',
      year: 2008,
      rating: '9.5',
      genre: ['دراما', 'إثارة', 'جريمة'],
      actors: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
      seasons: 5,
      episodes: 62,
      status: 'completed',
      language: 'English',
      featured: true,
    },
    {
      title: 'Game of Thrones',
      titleAr: 'صراع العروش',
      description: 'Nine noble families wage war against each other in order to gain control over the mythical land of Westeros.',
      descriptionAr: 'تسع عائلات نبيلة تخوض حرباً ضد بعضها البعض للسيطرة على الأرض الأسطورية ويستروس.',
      year: 2011,
      rating: '9.2',
      genre: ['دراما', 'فانتازيا', 'مغامرات'],
      actors: ['Emilia Clarke', 'Peter Dinklage', 'Kit Harington'],
      seasons: 8,
      episodes: 73,
      status: 'completed',
      language: 'English',
      featured: true,
    },
    {
      title: 'Stranger Things',
      titleAr: 'أشياء غريبة',
      description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
      descriptionAr: 'عندما يختفي صبي صغير، يجب على والدته ورئيس الشرطة وأصدقائه مواجهة قوى خارقة للطبيعة مرعبة لاستعادته.',
      year: 2016,
      rating: '8.7',
      genre: ['دراما', 'خيال علمي', 'رعب'],
      actors: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      seasons: 4,
      episodes: 42,
      status: 'ongoing',
      language: 'English',
      featured: true,
    },
  ];

  for (const series of seriesList) {
    await storage.createSeries(series);
  }

  // Sample episodes for Breaking Bad (series id: 1)
  const episodes: InsertEpisode[] = [
    {
      seriesId: 1,
      title: 'Pilot',
      titleAr: 'الحلقة التجريبية',
      season: 1,
      episode: 1,
      description: 'Walter White, a struggling high school chemistry teacher, is diagnosed with advanced lung cancer.',
      duration: 58,
      quality: 'HD',
    },
    {
      seriesId: 1,
      title: "Cat's in the Bag...",
      titleAr: 'القطة في الحقيبة...',
      season: 1,
      episode: 2,
      description: 'Walt and Jesse attempt to tie up loose ends. The desperate situation gets more complicated with the flip of a coin.',
      duration: 48,
      quality: 'HD',
    },
    {
      seriesId: 1,
      title: '...And the Bag\'s in the River',
      titleAr: '...والحقيبة في النهر',
      season: 1,
      episode: 3,
      description: 'Walter faces a dilemma as he and Jesse work to dispose of their captive, Krazy-8.',
      duration: 48,
      quality: 'HD',
    },
  ];

  for (const episode of episodes) {
    await storage.createEpisode(episode);
  }

  console.log('✅ Database seeded successfully!');
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData().catch(console.error);
}