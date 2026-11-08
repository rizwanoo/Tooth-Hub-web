import React, { useState } from 'react';
import { TREATMENTS, CLINIC_IMAGES } from '../data/content';
import { Language, PageId } from '../types';
import { InlineBookingForm } from '../components/InlineBookingForm';
import { Check, Calendar, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface TreatmentsPageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onBookClick: () => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  language,
  setCurrentPage: _setCurrentPage,
  onBookClick: _onBookClick,
}) => {
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedForBooking, setSelectedForBooking] = useState<string>('');

  const categories = [
    { id: 'all', labelEn: 'All Services', labelAr: 'جميع الخدمات' },
    { id: 'cosmetic', labelEn: 'Cosmetic & Veneers', labelAr: 'تجميل وتبييض الأسنان' },
    { id: 'general', labelEn: 'General & Preventative', labelAr: 'الفحص الدوري والوقاية' },
    { id: 'restorative', labelEn: 'Restorative & Fillings', labelAr: 'الترميمات والحشوات' },
    { id: 'orthodontics', labelEn: 'Clear Aligners', labelAr: 'التقويم الشفاف' },
    { id: 'specialist', labelEn: 'Specialist & Endodontics', labelAr: 'علاج الجذور والتخصصات' },
  ];

  const filteredTreatments =
    activeCategory === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === activeCategory);

  const handleBookTreatment = (treatmentId: string) => {
    setSelectedForBooking(treatmentId);
    const element = document.getElementById('inline-booking-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 pt-24 pb-20 w-full overflow-x-hidden">
      {/* Editorial Page Header */}
      <section className="border-b border-[#E7E2D6] bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-800 mb-3">
              <span>{isAr ? 'الخدمات العلاجية والتجميلية' : 'Clinical Menu & Procedures'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'توث هاب – البحرين' : 'Tooth Hub Speciality Centre'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 mb-4 text-balance">
              {isAr ? 'علاجات الأسنان التخصصية والتجميلية' : 'Speciality Dental Treatments'}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl text-balance">
              {isAr
                ? 'نقدم باقة متكاملة من الخدمات السنية الموثوقة بإشراف طبيبات متخصصات، مستندين إلى أحدث التقنيات الرقمية ومبادئ الحفاظ على الأسنان الطبيعية.'
                : 'Explore our evidence-based clinical offerings. From routine preventative hygiene to advanced ceramic veneers and digital orthodontic aligners, every treatment is tailored to your unique anatomical goals.'}
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
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

      {/* Main Treatments Catalog (Editorial Rectangular Compositions) */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {filteredTreatments.map((treatment, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={treatment.id}
                id={treatment.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border border-[#E7E2D6] bg-white p-6 sm:p-10 shadow-xs"
              >
                {/* Visual Asset Slot */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative border border-[#DFD8C8] bg-stone-50 overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={isAr ? treatment.titleAr : treatment.titleEn}
                      className="w-full h-72 sm:h-96 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 bg-white/95 backdrop-blur-xs text-[11px] font-bold uppercase tracking-wider text-teal-900 border border-stone-200">
                      {isAr ? `خدمة 0${idx + 1}` : `Service 0${idx + 1}`}
                    </div>
                  </div>
                </div>

                {/* Editorial Content Slot */}
                <div
                  className={`lg:col-span-7 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                      {isAr
                        ? treatment.category === 'cosmetic'
                          ? 'طب الأسنان التجميلي'
                          : treatment.category === 'orthodontics'
                          ? 'تقويم الأسنان الحديث'
                          : treatment.category === 'general'
                          ? 'طب الأسنان العام والوقائي'
                          : treatment.category === 'restorative'
                          ? 'الترميمات والحشوات الخزفية'
                          : 'العلاجات التخصصية'
                        : treatment.category.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
                      {isAr ? treatment.titleAr : treatment.titleEn}
                    </h2>
                    <p className="text-xs font-medium text-stone-500">
                      {isAr ? treatment.subtitleAr : treatment.subtitleEn}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {isAr ? treatment.descriptionAr : treatment.descriptionEn}
                  </p>

                  {/* Highlights definition */}
                  <div className="bg-[#FAF9F5] border border-stone-200/80 p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      {isAr ? 'أهم مميزات الإجراء:' : 'Clinical Protocol Highlights:'}
                    </span>
                    {(isAr ? treatment.featuresAr : treatment.featuresEn).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-800">
                        <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Suitable Candidates note */}
                  <div className="text-xs text-stone-500 border-l-2 rtl:border-l-0 rtl:border-r-2 border-teal-800 pl-3 rtl:pl-0 rtl:pr-3 py-1">
                    <strong className="text-stone-700 block mb-0.5">
                      {isAr ? 'الفئة المستفيدة من هذا العلاج:' : 'Candidate Profile:'}
                    </strong>
                    <span>{isAr ? treatment.suitableForAr : treatment.suitableForEn}</span>
                  </div>

                  {/* Booking Trigger */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleBookTreatment(treatment.id)}
                      className="px-5 py-2.5 bg-teal-900 text-white text-xs font-semibold hover:bg-teal-950 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isAr ? 'حجز موعد لهذه الخدمة' : 'Request Consultation'}</span>
                    </button>
                    <a
                      href={`https://wa.me/97338860066?text=${encodeURIComponent(
                        isAr
                          ? `مرحباً، أود الاستفسار عن خدمة: ${treatment.titleAr}`
                          : `Hello, I would like to inquire about: ${treatment.titleEn}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center gap-2"
                    >
                      <span>{isAr ? 'استفسار عبر الواتساب' : 'WhatsApp Inquiry'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transparent Medical Ethics & Consultation Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-6 sm:p-8 bg-white border border-[#DFD8C8] flex flex-col md:flex-row items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-stone-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-stone-600 leading-relaxed">
            <h4 className="font-bold text-stone-900 text-sm">
              {isAr ? 'الشفافية الطبية والمعايير الأخلاقية في توث هاب' : 'Clinical Transparency & Medical Integrity'}
            </h4>
            <p>
              {isAr
                ? 'المعلومات المقدمة هي معلومات عامة توضيحية. يتم تحديد الخطة العلاجية والخيارات المناسبة لكل مراجع بعد إجراء الفحص الإكلينيكي والأشعة اللازمة داخل العيادة. لا نروج لوعود علاجية غير واقعية، بل نلتزم بأرقى معايير طب الأسنان القائم على البراهين.'
                : 'All clinical descriptions provided above represent general educational healthcare information. Exact treatment pathways, suitability, and requirements are determined individually following comprehensive clinical examination and diagnostic radiography at our centre. Tooth Hub does not market unrealistic medical guarantees, adhering strictly to evidence-based practice and NHRA regulations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Inline Booking Form with preselected option */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <InlineBookingForm
          language={language}
          preselectedTreatmentId={selectedForBooking}
        />
      </section>
    </div>
  );
};
