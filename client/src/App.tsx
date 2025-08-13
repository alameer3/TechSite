import { Router, Route, Switch } from 'wouter';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/ThemeProvider';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SeriesDetailPage from './pages/SeriesDetailPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          <Router>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/movies" component={MoviesPage} />
              <Route path="/series" component={SeriesPage} />
              <Route path="/movie/:id" component={MovieDetailPage} />
              <Route path="/series/:id" component={SeriesDetailPage} />
              <Route path="/search" component={SearchPage} />
              <Route>
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
                    <p className="text-muted-foreground">الصفحة التي تبحث عنها غير متوفرة</p>
                  </div>
                </div>
              </Route>
            </Switch>
          </Router>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;