import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                أ
              </div>
              <span className="text-xl font-bold text-foreground">أكوام</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              الموقع العربي الأول لمشاهدة وتحميل الأفلام والمسلسلات العربية والأجنبية بأعلى جودة ومترجمة بالعربية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">الصفحة الرئيسية</a></li>
              <li><a href="/movies" className="hover:text-foreground transition-colors">الأفلام</a></li>
              <li><a href="/series" className="hover:text-foreground transition-colors">المسلسلات</a></li>
              <li><a href="/search" className="hover:text-foreground transition-colors">البحث</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">التصنيفات</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">أفلام عربية</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">أفلام أجنبية</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">مسلسلات عربية</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">مسلسلات أجنبية</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 أكوام. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center space-x-1 space-x-reverse mt-4 md:mt-0 text-sm text-muted-foreground">
            <span>صنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>في العالم العربي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}