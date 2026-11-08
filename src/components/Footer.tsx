import React from 'react';
import { CLINIC_INFO, CLINIC_IMAGES } from '../data/content';
import { Language, PageId } from '../types';
import { Phone, MessageCircle, MapPin, Clock, Instagram, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage: _currentPage,
  setCurrentPage,
  language,
  onBookClick,
}) => {
  const isAr = language === 'ar';

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4F1EA] border-t border-[#DFD8C8] text-stone-900 pt-16 pb-12 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#D8D0BE]">
          {/* Col 1: Brand & Official Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#DFD8C8] bg-white p-0.5 rounded-xs shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                <img
                  src={CLINIC_IMAGES.logo}
                  alt="Tooth Hub"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight font-sans text-stone-950">
                  TOOTH HUB
                </h3>
                <p className="text-xs uppercase tracking-wider text-stone-600 font-medium">
                  {isAr ? 'مركز متخصص لطب الأسنان' : 'Speciality Dental Centre'}
                </p>
              </div>
            </div>

            <p className="text-sm font-serif italic text-teal-950 font-medium">
              {CLINIC_INFO.brandEmojiTag}
            </p>

            <p className="text-xs text-stone-600 leading-relaxed">
              {isAr
                ? 'مركز طب أسنان تخصصي يقدم أرقى معايير العناية بصحة وجمال الابتسامة في بيئة علاجية راقية ومريحة بمحافظة المحرق.'
                : 'A bespoke speciality dental centre delivering clinical precision and aesthetic smile design in an unhurried, comfortable setting.'}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-teal-800 shrink-0" />
              <span>{isAr ? 'معايير طبية معتمدة وفق اشتراطات مملكة البحرين' : 'Practicing in accordance with Bahrain NHRA healthcare standards'}</span>
            </div>
          </div>

          {/* Col 2: Navigation & Pages */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              {isAr ? 'صفحات الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-stone-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('treatments')}
                  className="text-stone-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'العلاجات والخدمات' : 'Treatments & Services'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('dentists')}
                  className="text-stone-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'أطباؤنا وبيئة العيادة' : 'Our Dentists & Clinic'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-stone-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? 'المعرض وحجز المواعيد' : 'Gallery & Appointments'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onBookClick}
                  className="text-teal-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>{isAr ? 'طلب موعد كشف مباشرة' : 'Book Dental Consultation'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Verification */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              {isAr ? 'أوقات العمل المعتمدة' : 'Official Clinic Hours'}
            </h4>
            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">{isAr ? 'السبت – الخميس:' : 'Saturday – Thursday:'}</p>
                  <p className="tabular-nums">9:00 AM – 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center shrink-0 mt-0.5 text-[9px] text-stone-500">
                  ✕
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{isAr ? 'يوم الجمعة:' : 'Friday:'}</p>
                  <p className="text-stone-500">{isAr ? 'مغلق (حالات الطوارئ بترتيب مسبق)' : 'Closed (Emergency on prior arrangement)'}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#D5CDC0] text-xs font-semibold text-stone-800 hover:text-teal-900 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-700" />
                <span>{CLINIC_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Col 4: Verified Contact & Address */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">
              {isAr ? 'الموقع والتواصل' : 'Location & Contact'}
            </h4>
            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">{isAr ? 'البحرين، المحرق' : 'Kingdom of Bahrain'}</p>
                  <p className="leading-relaxed">
                    {isAr ? CLINIC_INFO.addressAr : CLINIC_INFO.addressEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-teal-800 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.landlineRaw}`}
                  className="font-medium text-stone-900 hover:text-teal-800 tabular-nums"
                >
                  {CLINIC_INFO.landline}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-stone-900 hover:text-emerald-800 tabular-nums"
                >
                  {CLINIC_INFO.whatsapp} (WhatsApp)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Clean copyright and unboxed metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Tooth Hub Speciality Dental Centre · Busaiteen, Muharraq. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-3">
            <span>{isAr ? 'طب أسنان تخصصي' : 'Speciality Dental Care'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'تصميم الابتسامة' : 'Smile Aesthetics'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'أحدث التقنيات' : 'Digital Precision'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
