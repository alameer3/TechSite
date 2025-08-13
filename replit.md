# Overview

**أكوام كلون** - موقع ترفيهي عربي مشابه لأكوام مع واجهة RTL وعرض محتوى الأفلام والمسلسلات. تم تطوير البيئة الكاملة للمشروع باستخدام أحدث التقنيات والممارسات الحديثة في تطوير الويب.

# User Preferences

- **التواصل**: لغة بسيطة ومفهومة، باللغة العربية عند الطلب
- **التطوير**: يفضل النهج التدريجي - إنشاء البيئة أولاً ثم البناء التعاوني
- **التصميم**: تركيز على دعم RTL والواجهات العربية

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight routing
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS with custom RTL configuration
- **Components**: Custom component library with shadcn/ui inspiration
- **Theme**: Dark/Light mode support with ThemeProvider

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Development Server**: Vite for hot reloading and dev experience
- **Storage**: In-memory storage (MemStorage) for development
- **API**: RESTful API with TypeScript and Zod validation
- **Database Schema**: Drizzle ORM ready (PostgreSQL configured)

## Key Features Implemented
1. **الصفحة الرئيسية**: Hero section, featured content, categories
2. **صفحة الأفلام**: Grid/list view, search, filtering, sorting
3. **صفحة المسلسلات**: Similar functionality to movies page
4. **تفاصيل المحتوى**: Dedicated pages for movies and series
5. **البحث**: Comprehensive search across all content
6. **التنقل**: Responsive navbar with mobile support
7. **الثيمز**: Dark/light mode toggle

## Database Schema
- **Movies**: Title, description, poster, rating, genre, cast, etc.
- **Series**: Similar to movies plus seasons/episodes info
- **Episodes**: Individual episode data linked to series
- **Categories**: Content categorization system

## RTL & Arabic Support
- **Direction**: Full RTL layout support
- **Typography**: Cairo font family optimized for Arabic
- **Content**: All UI text in Arabic
- **Search**: Arabic text search functionality
- **URLs**: Arabic-friendly routing

# Technical Stack

## Core Dependencies
- **React**: ^18.3.1 - UI framework
- **TypeScript**: ^5.7.3 - Type safety
- **Vite**: ^6.0.3 - Build tool and dev server
- **Express**: ^4.21.2 - Backend server
- **Tailwind CSS**: ^3.5.6 - Styling
- **TanStack Query**: ^5.62.6 - Data fetching
- **Drizzle ORM**: ^0.36.4 - Database ORM
- **Zod**: ^3.24.1 - Schema validation
- **Wouter**: ^3.3.5 - Routing

## Development Tools
- **tsx**: For running TypeScript on Node.js
- **Lucide React**: Icon system
- **React Hook Form**: Form handling
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

# File Structure
```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configs
│   │   ├── hooks/          # Custom React hooks
│   │   └── assets/         # Static assets
├── server/                 # Backend application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data layer
│   └── seed.ts            # Sample data
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── Configuration files
```

# Recent Changes (Latest Session)

## ✅ Environment Setup Complete
- Full-stack TypeScript application with React + Express
- RTL-first design with Arabic language support
- Complete UI component system
- In-memory storage with sample data
- Responsive design with mobile support

## ✅ Core Features Implemented
- Homepage with hero section and featured content
- Movies and series browsing with search/filter
- Detailed content pages with cast and episode info
- Global search functionality
- Theme switching (dark/light mode)
- Arabic typography and RTL layout

## 🚀 Ready for Development
The complete foundation is now in place. The application includes:
- Sample movies and series data
- Full CRUD API endpoints
- Responsive Arabic interface
- Search and filtering capabilities
- Modern development environment

## Next Steps Suggested
1. Start the development server to see the application
2. Customize the design and add more sample content
3. Implement video player functionality
4. Add user authentication if needed
5. Deploy the application when ready