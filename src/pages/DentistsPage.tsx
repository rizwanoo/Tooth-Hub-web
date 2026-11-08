import React, { useState } from 'react';
import { DENTISTS, CLINIC_IMAGES } from '../data/content';
import { Language, PageId } from '../types';
import { InlineBookingForm } from '../components/InlineBookingForm';
import { Calendar, ShieldCheck, Heart, Sparkles, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

interface DentistsPageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onBookClick: () => void;
}

export const DentistsPage: React.FC<DentistsPageProps> = ({
  language,
  setCurrentPage: _setCurrentPage,
  onBookClick: _onBookClick,
}) => {
  const isAr = language === 'ar';
  const [selectedDentistId, setSelectedDentistId] = useState<string>('');

  const handleBookWithDoctor = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    const element = document.getElementById('inline-booking-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 pt-24 pb-20 w-full overflow-x-hidden">
      {/* Editorial Header */}
      <section className="border-b border-[#E7E2D6] bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-800 mb-3">
              <span>{isAr ? 'الكادر الطبي والبيئة السريرية' : 'Resident Faculty & Clinical Facility'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'البسيتين – المحرق' : 'Busaiteen, Muharraq'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 mb-4 text-balance">
              {isAr ? 'أطباؤنا وبيئة العيادة' : 'Our Dentists & The Clinic'}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl text-balance">
              {isAr
                ? 'فريق من طبيبات الأسنان المتخصصات الملتزمات بتقديم رعاية سنية دقيقة وقائمة على البراهين، في بيئة طبية راقية مصممة لضمان راحة وسلامة كل مراجع.'
                : 'Meet the resident dental practitioners at Tooth Hub Speciality Dental Centre. Rooted in clinical rigor, continuing dental education, and patient-first ethics, our team delivers unhurried consultations across all dental disciplines.'}
            </p>
          </div>
        </div>
      </section>

      {/* Verified Dentists Profiles Showcase */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="border-b border-[#DFD8C8] pb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                {isAr ? 'الطاقم الطبي المعتمد' : 'Resident Clinical Team'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                {isAr ? 'طبيبات مركز توث هاب' : 'Resident Dental Practitioners'}
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:block">
              {isAr ? 'مرخصون من الهيئة الوطنية لتنظيم المهن والخدمات الصحية (NHRA)' : 'Licensed by NHRA Kingdom of Bahrain'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DENTISTS.map((dentist) => (
              <div
                key={dentist.id}
                className="bg-white border border-[#E7E2D6] overflow-hidden flex flex-col justify-between shadow-xs hover:border-teal-800 transition-colors"
              >
                <div>
                  {/* Doctor Real Photographic Portrait */}
                  <div className="relative h-72 sm:h-80 w-full bg-stone-200 overflow-hidden">
                    <img
                      src={dentist.image}
                      alt={dentist.nameEn}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-teal-900 border border-stone-200 shadow-2xs">
                      <UserCheck className="w-3.5 h-3.5 text-teal-800" />
                      <span>{isAr ? 'ممارس معتمد' : 'Verified Resident'}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                      {isAr ? dentist.nameAr : dentist.nameEn}
                    </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2">
                    {isAr ? dentist.titleAr : dentist.titleEn}
                  </p>
                  <p className="text-xs text-stone-500 font-medium mb-4">
                    {isAr ? dentist.specializationAr : dentist.specializationEn}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {isAr ? dentist.bioAr : dentist.bioEn}
                  </p>

                  {/* Areas of clinical focus */}
                  <div className="bg-[#FAF9F5] border border-stone-200 p-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      {isAr ? 'مجالات التركيز السريري:' : 'Clinical Focus Areas:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {(isAr ? dentist.focusAreasAr : dentist.focusAreasEn).map((area, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">{isAr ? 'اللغات:' : 'Languages:'}</span>
                    <span>{(isAr ? dentist.languagesAr : dentist.languagesEn).join(' · ')}</span>
                  </div>
                </div>
              </div>

                <div className="pt-6 border-t border-stone-200 mt-6 space-y-2">
                  <button
                    onClick={() => handleBookWithDoctor(dentist.id)}
                    className="w-full py-2.5 bg-teal-900 text-white text-xs font-semibold hover:bg-teal-950 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isAr ? `طلب موعد مع ${dentist.nameAr}` : `Book with ${dentist.nameEn}`}</span>
                  </button>
                  <a
                    href={`https://wa.me/97338860066?text=${encodeURIComponent(
                      isAr
                        ? `مرحباً، أود الاستفسار عن حجز موعد مع ${dentist.nameAr}`
                        : `Hello, I would like to inquire about booking with ${dentist.nameEn}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{isAr ? 'استفسار واتساب مباشر' : 'WhatsApp Inquiry'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Tour of the Clinic Experience */}
      <section className="py-16 lg:py-24 bg-white border-y border-[#E7E2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">
              {isAr ? 'الجولة المعمارية والسريرية' : 'The Clinic Environment'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-950 font-semibold text-balance">
              {isAr ? 'مرافق مصممة لراحتكم في منطقة الساية' : 'Designed for Calm, Precision & Safety'}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {isAr
                ? 'استكشف بيئة العيادة المتطورة حيث تلتقي الضيافة الدافئة بأحدث معايير الأمان الطبي.'
                : 'Take an architectural look inside Tooth Hub in Al Sayah, Busaiteen. Every suite is purpose-built to eliminate traditional dental anxiety.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Feature 1: Reception */}
            <div className="border border-[#E7E2D6] bg-[#FAF9F5] p-6 sm:p-8">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={CLINIC_IMAGES.reception}
                  alt="Tooth Hub Reception Lounge"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                {isAr ? '01. صالة الاستقبال والضيافة الهادئة' : '01. Reception & Wellness Waiting Lounge'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAr
                  ? 'تشطيبات من الحجر الجيري العاجي وجلسات مريحة منفصلة تضمن الخصوصية وراحة البال قبل بدء جلستك العلاجية.'
                  : 'Natural travertine textures, warm ivory wall paneling, and acoustic zoning ensure your visit begins with stillness and dedicated reception assistance.'}
              </p>
            </div>

            {/* Feature 2: Panoramic Operatories */}
            <div className="border border-[#E7E2D6] bg-[#FAF9F5] p-6 sm:p-8">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={CLINIC_IMAGES.hero}
                  alt="Tooth Hub Panoramic Operatory Suite"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                {isAr ? '02. أجنحة علاجية بانورامية خاصة' : '02. Panoramic Private Operatories'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAr
                  ? 'غرف علاج مجهزة بنوافذ زجاجية عريضة تطل على ساحل المحرق لتوفير إضاءة نهارية طبيعية وتخفيف رهبة العيادات التقليدية.'
                  : 'Floor-to-ceiling panoramic glass windows fill the operatory with natural daylight, pairing ergonomic dental chairs with relaxing waterfront vistas.'}
              </p>
            </div>

            {/* Feature 3: Central Sterilization */}
            <div className="border border-[#E7E2D6] bg-[#FAF9F5] p-6 sm:p-8">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={CLINIC_IMAGES.sterilizationLab}
                  alt="Tooth Hub Central Sterilization Autoclave Lab"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                {isAr ? '03. وحدة التعقيم المركزي والمطهرات' : '03. Hospital-Grade Central Sterilization'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAr
                  ? 'بروتوكولات تعقيم ثلاثية المراحل باستخدام أجهزة أوتوكلاف طبية معتمدة ومؤشرات كيميائية تراقب سلامة كل أداة مغلفة.'
                  : 'Multi-stage ultrasonic debridement and fractional vacuum autoclaves. Every instrument cassette is sealed in single-use barrier pouches with physical test strips.'}
              </p>
            </div>

            {/* Feature 4: 3D Scanner Tech */}
            <div className="border border-[#E7E2D6] bg-[#FAF9F5] p-6 sm:p-8">
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={CLINIC_IMAGES.scannerTech}
                  alt="Tooth Hub 3D Digital Intraoral Scanner"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                {isAr ? '04. الماسح الضوئي الرقمي المباشر' : '04. Instant 3D Intraoral Optical Scanning'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAr
                  ? 'مسح دقيق لمينا الأسنان واللثة بالملليمتر يتيح عرض المحاكاة ثلاثية الأبعاد على الشاشة فوراً دون قياسات الشمع التقليدية.'
                  : 'Rapid optical scanning capturing thousands of 3D data points per second. Patients see their teeth in high-definition color directly on screen.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Comfort Amenities */}
      <section className="py-16 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DFD8C8] p-8 sm:p-12">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-6">
              {isAr ? 'وسائل الراحة والعناية بالمرضى في توث هاب' : 'Patient Comfort Amenities & Gentle Standards'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
              <div className="space-y-2 border-t border-stone-200 pt-3">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Heart className="w-4 h-4" />
                  <span>{isAr ? 'جلسات علاجية متأنية' : 'Unhurried Appointments'}</span>
                </div>
                <p>
                  {isAr
                    ? 'نحرص على ألا يشعر المراجع بأي عجلة، مع إتاحة وقت كافٍ للإجابة عن كافة التساؤلات قبل البدء.'
                    : 'Extended appointment slots so patients never feel rushed, with thorough time to ask questions.'}
                </p>
              </div>

              <div className="space-y-2 border-t border-stone-200 pt-3">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'تخدير موضعي لطيف' : 'Gentle Numbing Protocols'}</span>
                </div>
                <p>
                  {isAr
                    ? 'استخدام جل تخدير سطحي مسبق لتقليل أي إحساس بوخز الإبرة الموضعية لأدنى حد ممكن.'
                    : 'Topical anesthetic pre-gels and fine-gauge needles to make local numbing nearly imperceptible.'}
                </p>
              </div>

              <div className="space-y-2 border-t border-stone-200 pt-3">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'بيئة ودودة للأطفال' : 'Child-Friendly Cadence'}</span>
                </div>
                <p>
                  {isAr
                    ? 'أسلوب ترحيبي هادئ يعود الأطفال على زيارة طبيب الأسنان كعادة وقائية إيجابية ممتعة.'
                    : 'Compassionate pediatric approach focused on positive reinforcement and fear-free visits.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Inline Booking Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <InlineBookingForm
          language={language}
          preselectedDentistId={selectedDentistId}
        />
      </section>
    </div>
  );
};
