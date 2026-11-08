import React, { useState, useEffect } from 'react';
import { CLINIC_INFO, CLINIC_IMAGES } from '../data/content';
import { Language, PageId } from '../types';
import { Phone, MessageCircle, Menu, X, Calendar, Globe } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  onBookClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; labelEn: string; labelAr: string }[] = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'treatments', labelEn: 'Treatments', labelAr: 'العلاجات والخدمات' },
    { id: 'dentists', labelEn: 'Our Dentists', labelAr: 'أطباؤنا والعيادة' },
    { id: 'contact', labelEn: 'Gallery & Appointments', labelAr: 'المعرض والمواعيد' },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHeroPage = currentPage === 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E2D6] shadow-xs py-2.5 sm:py-3.5'
            : isHeroPage
            ? 'bg-gradient-to-b from-stone-950/70 via-stone-950/30 to-transparent text-white py-3 sm:py-5'
            : 'bg-[#FAF9F5]/90 backdrop-blur-xs border-b border-[#E7E2D6] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Zone 1: Official Tooth Hub Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left rtl:text-right shrink-0 group cursor-pointer focus:outline-hidden min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-[#DFD8C8] p-0.5 rounded-xs shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
              <img
                src={CLINIC_IMAGES.logo}
                alt="Tooth Hub Official Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Resilient fallback in case of network anomaly
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-base sm:text-lg md:text-xl font-bold tracking-tight font-sans transition-colors whitespace-nowrap ${
                  !isScrolled && isHeroPage ? 'text-white' : 'text-stone-900'
                }`}
              >
                TOOTH HUB
              </span>
              <span
                className={`text-[9px] sm:text-[10px] md:text-xs tracking-wider uppercase font-medium hidden sm:block ${
                  !isScrolled && isHeroPage ? 'text-stone-200' : 'text-stone-500'
                }`}
              >
                {isAr ? 'مركز متخصص لطب الأسنان' : 'Speciality Dental Centre'}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs xl:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 relative py-1 focus:outline-hidden ${
                    active
                      ? !isScrolled && isHeroPage
                        ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                        : 'text-teal-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-800'
                      : !isScrolled && isHeroPage
                      ? 'text-stone-200 hover:text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Toggle & Actions (Compact for Mobile to Prevent Overflow) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className={`flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                !isScrolled && isHeroPage
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-stone-300 text-stone-700 hover:border-stone-400 hover:bg-stone-100/60'
              }`}
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Quick WhatsApp Link (Desktop only) */}
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(
                isAr
                  ? 'مرحباً، أود الاستفسار عن حجز موعد في مركز توث هاب لطب الأسنان'
                  : 'Hello, I would like to inquire about booking an appointment at Tooth Hub Dental Centre'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors ${
                !isScrolled && isHeroPage
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-teal-700/30 text-teal-900 hover:bg-teal-50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="tabular-nums font-sans">3886 0066</span>
            </a>

            {/* Primary Action Button (Compact on mobile, full on tablet/desktop) */}
            <button
              onClick={onBookClick}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                !isScrolled && isHeroPage
                  ? 'bg-white text-stone-900 hover:bg-stone-100'
                  : 'bg-teal-900 text-white hover:bg-teal-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{isAr ? 'حجز موعد' : 'Book Appointment'}</span>
            </button>

            {/* Mobile Booking Quick Button for smaller phones */}
            <button
              onClick={onBookClick}
              className={`sm:hidden p-1.5 transition-colors cursor-pointer border ${
                !isScrolled && isHeroPage
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-teal-900 border-teal-900 text-white'
              }`}
              title={isAr ? 'حجز موعد' : 'Book Appointment'}
              aria-label={isAr ? 'حجز موعد' : 'Book Appointment'}
            >
              <Calendar className="w-4 h-4" />
            </button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 transition-colors cursor-pointer shrink-0 ${
                !isScrolled && isHeroPage ? 'text-white' : 'text-stone-800'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-stone-950/60 backdrop-blur-xs pt-16 px-3 pb-6 flex flex-col justify-start animate-fadeIn">
          <div className="bg-[#FAF9F5] border border-[#E7E2D6] p-5 shadow-2xl space-y-5 max-w-sm w-full mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <img
                  src={CLINIC_IMAGES.logo}
                  alt="Tooth Hub"
                  className="w-7 h-7 object-contain"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  {isAr ? 'القائمة الرئيسية' : 'Tooth Hub Navigation'}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2.5">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left rtl:text-right py-2 text-sm font-medium transition-colors border-b border-stone-100 ${
                      active ? 'text-teal-900 font-bold' : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-2.5 bg-teal-900 text-white text-center font-semibold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'طلب موعد في العيادة' : 'Book Dental Appointment'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${CLINIC_INFO.landlineRaw}`}
                  className="flex items-center justify-center gap-1.5 py-2 border border-stone-300 text-stone-800 bg-white"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-800" />
                  <span className="tabular-nums">1733 1999</span>
                </a>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 border border-emerald-300 text-emerald-900 bg-emerald-50/50"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="tabular-nums">3886 0066</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
