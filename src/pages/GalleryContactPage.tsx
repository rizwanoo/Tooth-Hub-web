import React, { useState } from 'react';
import { GALLERY_ITEMS, CLINIC_INFO, CLINIC_IMAGES } from '../data/content';
import { Language, PageId } from '../types';
import { InlineBookingForm } from '../components/InlineBookingForm';
import { Phone, MessageCircle, MapPin, Clock, Instagram, ExternalLink, Compass } from 'lucide-react';

interface GalleryContactPageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onBookClick: () => void;
}

export const GalleryContactPage: React.FC<GalleryContactPageProps> = ({
  language,
  setCurrentPage: _setCurrentPage,
  onBookClick: _onBookClick,
}) => {
  const isAr = language === 'ar';
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  const galleryCategories = [
    { id: 'all', labelEn: 'All Spaces & Cases', labelAr: 'جميع الصور' },
    { id: 'suites', labelEn: 'Treatment Suites', labelAr: 'أجنحة العلاج' },
    { id: 'interior', labelEn: 'Clinic Architecture', labelAr: 'مرافق العيادة' },
    { id: 'smiles', labelEn: 'Smile Transformations', labelAr: 'تجميل الابتسامة' },
    { id: 'technology', labelEn: 'Dental Technology', labelAr: 'الأجهزة الرقمية' },
    { id: 'sterilization', labelEn: 'Sterilization Suite', labelAr: 'التعقيم الطبي' },
  ];

  const filteredGallery =
    galleryFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 pt-24 pb-20 w-full overflow-x-hidden">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E2D6] bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-800 mb-3">
              <span>{isAr ? 'المعرض البصري وحجز المواعيد' : 'Visual Portfolio & Consultations'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'الساية – البسيتين' : 'Al Sayah, Muharraq'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 mb-4 text-balance">
              {isAr ? 'المعرض، المواعيد والموقع' : 'Gallery, Appointments & Contact'}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl text-balance">
              {isAr
                ? 'شاهد لقطات من بيئة العيادة الحقيقية وأجنحة العلاج والأجهزة الرقمية، وتفضل بحجز موعد استشارتك مباشرة أو زيارتنا في منطقة الساية بمحافظة المحرق.'
                : 'Explore authentic imagery of the Tooth Hub clinic spaces, private treatment suites, and advanced dental technology. Request your appointment directly through our inline form or find our exact location in Al Sayah.'}
            </p>
          </div>

          {/* Gallery Category Filter Tabs */}
          <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
            {galleryCategories.map((cat) => {
              const active = galleryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-teal-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 01. EDITORIAL ASYMMETRIC GALLERY GRID */}
      <section className="py-16 lg:py-24 border-b border-[#E7E2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                className={`group border border-[#E7E2D6] bg-white p-3 flex flex-col justify-between hover:border-teal-800 transition-all ${
                  item.featured && idx === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={isAr ? item.titleAr : item.titleEn}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      item.featured && idx === 0 ? 'h-80 sm:h-96' : 'h-64 sm:h-72'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-stone-800 border border-stone-200">
                    {isAr
                      ? item.category === 'interior'
                        ? 'مرافق العيادة'
                        : item.category === 'suites'
                        ? 'أجنحة العلاج'
                        : item.category === 'technology'
                        ? 'التكنولوجيا'
                        : item.category === 'smiles'
                        ? 'الابتسامة'
                        : 'التعقيم الطبي'
                      : item.category}
                  </div>
                </div>

                <div className="pt-4 pb-2 px-1">
                  <h3 className="text-base font-serif font-bold text-stone-900 mb-1 group-hover:text-teal-900 transition-colors">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {isAr ? item.captionAr : item.captionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. INLINE APPOINTMENT BOOKING SECTION */}
      <section className="py-16 lg:py-24 bg-[#F6F4ED] border-b border-[#E7E2D6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800 block mb-1">
              {isAr ? 'حجز مباشر وبدون نوافذ منبثقة' : 'Direct Booking Channel'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {isAr ? 'طلب موعد في مركز توث هاب' : 'Reserve Your Clinical Appointment'}
            </h2>
          </div>
          <InlineBookingForm language={language} />
        </div>
      </section>

      {/* 03. CONTACT DETAILS & GOOGLE MAPS LOCATION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info & Action Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-800 block mb-2">
                  {isAr ? 'بيانات الاتصال والعنوان' : 'Official Clinic Contact'}
                </span>
                <h2 className="text-3xl font-serif font-bold text-stone-950 mb-3">
                  {isAr ? 'نسعد باستقبالكم وتواصلكم' : 'Get in Touch with Tooth Hub'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isAr
                    ? 'يقع المركز في موقع استراتيجي وهادئ بمنطقة الساية في البسيتين، مع مواقف سيارات مخصصة لراحة المراجعين.'
                    : 'Conveniently situated in the peaceful seaside district of Al Sayah, Busaiteen, with dedicated parking facilities for our patients.'}
                </p>
              </div>

              {/* Verified Contact Details Blocks */}
              <div className="space-y-4">
                {/* Landline */}
                <div className="p-4 border border-stone-200 bg-[#FAF9F5] flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-stone-300 text-teal-900 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {isAr ? 'هاتف الاستقبال المباشر:' : 'Direct Reception Landline:'}
                    </h4>
                    <a
                      href={`tel:${CLINIC_INFO.landlineRaw}`}
                      className="text-base font-bold text-stone-900 hover:text-teal-900 tabular-nums block mt-0.5"
                    >
                      {CLINIC_INFO.landline}
                    </a>
                    <span className="text-[11px] text-stone-500">
                      {isAr ? 'متاح طوال ساعات العمل الرسمية' : 'Available during working hours'}
                    </span>
                  </div>
                </div>

                {/* WhatsApp & Mobile */}
                <div className="p-4 border border-emerald-200 bg-emerald-50/40 flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-emerald-300 text-emerald-800 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      {isAr ? 'الواتساب وخدمة العملاء:' : 'WhatsApp & Mobile Desk:'}
                    </h4>
                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(
                        isAr
                          ? 'مرحباً، أود الاستفسار عن موعد في مركز توث هاب'
                          : 'Hello Tooth Hub, I would like to inquire about an appointment'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-stone-900 hover:text-emerald-800 tabular-nums block mt-0.5"
                    >
                      {CLINIC_INFO.whatsapp}
                    </a>
                    <span className="text-[11px] text-stone-500">
                      {isAr ? 'إرسال استفسار فوري عبر الواتساب' : 'Instant WhatsApp messaging'}
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="p-4 border border-stone-200 bg-[#FAF9F5] flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-stone-300 text-teal-900 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {isAr ? 'أوقات العمل المعتمدة:' : 'Official Working Hours:'}
                    </h4>
                    <p className="text-sm font-bold text-stone-900 mt-0.5">
                      {isAr ? CLINIC_INFO.openingHoursAr : CLINIC_INFO.openingHoursEn}
                    </p>
                    <p className="text-xs text-rose-700 mt-0.5">
                      {isAr ? CLINIC_INFO.fridayStatusAr : CLINIC_INFO.fridayStatusEn}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="p-4 border border-stone-200 bg-[#FAF9F5] flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-stone-300 text-teal-900 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {isAr ? 'العنوان الجغرافي:' : 'Physical Address:'}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5 leading-relaxed">
                      {isAr ? CLINIC_INFO.addressAr : CLINIC_INFO.addressEn}
                    </p>
                  </div>
                </div>

                {/* Instagram Profile Link */}
                <div className="pt-2">
                  <a
                    href={CLINIC_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-stone-200 bg-white hover:border-pink-300 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-pink-700" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">{CLINIC_INFO.instagramHandle}</p>
                        <p className="text-[11px] text-stone-500">
                          {isAr ? 'تابع أحدث الحالات والنصائح اليومية' : 'Official Tooth Hub Instagram'}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-pink-700" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Embedded Interactive Map and Building Exterior View */}
            <div className="lg:col-span-7 space-y-6">
              {/* Building Facade Photo */}
              <div className="border border-[#DFD8C8] bg-white p-2">
                <img
                  src={CLINIC_IMAGES.exteriorAlSayah}
                  alt="Tooth Hub Al Sayah Busaiteen Muharraq exterior"
                  className="w-full h-64 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-[#FAF9F5] border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span>{isAr ? 'مبنى المركز في منطقة الساية، البسيتين' : 'Al Sayah Medical Enclave Facade'}</span>
                  <span>Busaiteen, Muharraq</span>
                </div>
              </div>

              {/* Embedded Google Map iframe & Directions CTA */}
              <div className="border border-[#DFD8C8] bg-white overflow-hidden shadow-xs">
                <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal-800" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      {isAr ? 'خريطة الوصول المباشرة' : 'Google Maps Location'}
                    </span>
                  </div>
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal-900 hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Interactive Map Embed */}
                <div className="h-72 w-full bg-stone-200">
                  <iframe
                    title="Tooth Hub Google Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4716168536785!2d50.604011!3d26.273600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE2JzI1LjAiTiA1MMKwMzYnMTUuMSJF!5e0!3m2!1sen!2sbh!4v1680000000000!5m2!1sen!2sbh"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
