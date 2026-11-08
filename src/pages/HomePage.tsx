import React from 'react';
import { CLINIC_IMAGES, CLINIC_INFO, DENTISTS, TESTIMONIALS, TREATMENTS, CLINIC_HIGHLIGHTS } from '../data/content';
import { Language, PageId } from '../types';
import { InlineBookingForm } from '../components/InlineBookingForm';
import { Calendar, ArrowRight, ShieldCheck, Clock, MapPin, Check, ChevronRight } from 'lucide-react';

interface HomePageProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onBookClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  setCurrentPage,
  onBookClick,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 w-full overflow-x-hidden">
      {/* 01. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background photographic asset */}
        <div className="absolute inset-0 z-0">
          <img
            src={CLINIC_IMAGES.hero}
            alt="Tooth Hub panoramic dental suite overlooking Bahrain"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtleZoom"
            referrerPolicy="no-referrer"
          />
          {/* Measured gradient scrim for impeccable legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-stone-950/60" />
        </div>

        {/* Hero Content - Note: The kicker line 'Speciality Dental Centre · Bahrain' has been removed as requested */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:py-36 text-white text-center sm:text-left rtl:sm:text-right w-full">
          <div className="max-w-3xl">
            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 text-balance">
              {isAr ? (
                <>
                  نهتم بصحة ابتسامتك <br />
                  <span className="font-normal italic text-stone-200">وجمال تفاصيلها.</span>
                </>
              ) : (
                <>
                  A Healthier Smile. <br />
                  <span className="font-normal italic text-stone-200">A More Confident You.</span>
                </>
              )}
            </h1>

            {/* Supporting Prose */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-200 leading-relaxed font-light mb-8 max-w-2xl text-balance">
              {isAr
                ? 'في توث هاب، نجمع بين الدقة العلاجية المتناهية وفن تصميم الابتسامة الطبيعية في بيئة هادئة ومريحة تليق بكم في محافظة المحرق.'
                : 'At Tooth Hub, we care for the health of your smile and the beauty behind it. Discover professional dental care delivered with clinical precision in a comfortable, welcoming environment.'}
            </p>

            {/* Direct Hero CTA actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onBookClick}
                className="px-6 sm:px-7 py-3.5 bg-white text-stone-900 font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-800" />
                <span>{isAr ? 'حجز موعد استشارة' : 'Book Appointment'}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('treatments');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 sm:px-7 py-3.5 bg-stone-900/40 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm hover:bg-stone-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'استعراض الخدمات والعلاجات' : 'Explore Treatments'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Operational Utility Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E7E2D6] py-3 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-800 shrink-0" />
              <span>{isAr ? CLINIC_INFO.shortLocationAr : CLINIC_INFO.shortLocationEn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-800 shrink-0" />
              <span>{isAr ? CLINIC_INFO.openingHoursAr : CLINIC_INFO.openingHoursEn}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-stone-900">{isAr ? 'للتواصل والاستفسار:' : 'Direct Desk:'}</span>
              <a href={`tel:${CLINIC_INFO.landlineRaw}`} className="tabular-nums hover:text-teal-900 font-medium">
                {CLINIC_INFO.landline}
              </a>
              <span>·</span>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-medium"
              >
                WhatsApp: {CLINIC_INFO.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02. BRAND PHILOSOPHY & PATIENT-CARE EXPERIENCE (Editorial Split) */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative border border-[#DFD8C8] bg-white p-2 shadow-xs">
                <img
                  src={CLINIC_IMAGES.reception}
                  alt="Tooth Hub tranquil reception and wellness waiting lounge"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                <span>{isAr ? 'صالة الاستقبال والضيافة في توث هاب' : 'Tooth Hub Patient Reception Lounge'}</span>
                <span>Al Sayah, Muharraq</span>
              </div>
            </div>

            {/* Right Column: Editorial Prose */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-teal-800">
                {isAr ? 'فلسفتنا في الرعاية السنية' : 'The Tooth Hub Philosophy'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold leading-tight text-balance">
                {isAr
                  ? 'رعاية طبية راقية تجعل زيارة طبيب الأسنان تجربة تبعث على الراحة والاطمئنان.'
                  : 'Dental care elevated to an unhurried, peaceful experience.'}
              </h2>

              <p className="text-stone-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                {isAr
                  ? 'أسسنا مركز توث هاب ليكون وجهتكم الموثوقة لصحة الفم والأسنان في مملكة البحرين. نؤمن بأن العلاج الناجح يبدأ من الاستماع الواعي لمتطلبات المريض، واستخدام أحدث أجهزة التشخيص والتعقيم، وتوفير أجواء هادئة تزيل أي توتر مسبق.'
                  : 'Located in the tranquil coastal enclave of Al Sayah, Busaiteen, Tooth Hub was established with a clear mandate: to combine rigorous clinical evidence with an atmosphere of serene luxury. From the moment you arrive, your treatment is guided by transparent consultation and meticulous craftsmanship.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border-t border-[#DFD8C8] pt-3">
                  <h3 className="font-semibold text-stone-900 text-sm mb-1">
                    {isAr ? 'عناية محافظة ودقيقة' : 'Conservative Dentistry'}
                  </h3>
                  <p className="text-xs text-stone-600 leading-normal">
                    {isAr
                      ? 'الحفاظ على بنية السن الطبيعية وتجنب التدخلات غير الضرورية.'
                      : 'Preserving healthy natural tooth structure with minimally invasive techniques.'}
                  </p>
                </div>
                <div className="border-t border-[#DFD8C8] pt-3">
                  <h3 className="font-semibold text-stone-900 text-sm mb-1">
                    {isAr ? 'بيئة علاجية خاصة' : 'Private Dental Suites'}
                  </h3>
                  <p className="text-xs text-stone-600 leading-normal">
                    {isAr
                      ? 'أجنحة مستقلة بإطلالات طبيعية وعزل كامل لراحة وخصوصية المراجعين.'
                      : 'Independent panoramic operatories ensuring acoustic comfort and strict privacy.'}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setCurrentPage('dentists');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-900 hover:text-teal-950 underline underline-offset-4 cursor-pointer"
                >
                  <span>{isAr ? 'تعرف على أطبائنا والعيادة بالتفصيل' : 'Discover Our Resident Dentists & Clinic Suites'}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. FEATURED DENTAL TREATMENTS SHOWCASE */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">
                {isAr ? 'خدمات تخصصية معتمدة' : 'Clinical Specialities'}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold text-balance">
                {isAr ? 'علاجات متكاملة لصحة وجمال ابتسامتك' : 'Comprehensive Treatments Tailored to You'}
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('treatments');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-teal-900 pb-1 border-b border-stone-300 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>{isAr ? 'عرض جميع الخدمات والعلاجات (6)' : 'View All Treatments (6)'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TREATMENTS.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="group border border-[#E7E2D6] bg-[#FAF9F5] flex flex-col justify-between transition-all duration-300 hover:border-teal-800/60 hover:shadow-md"
              >
                <div>
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={isAr ? item.titleAr : item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[11px] font-semibold uppercase tracking-wider text-stone-800 border border-stone-200">
                      {isAr ? `0${idx + 1}. تخصصي` : `0${idx + 1}. Speciality`}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 group-hover:text-teal-900 transition-colors">
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-teal-800 font-medium mb-3">
                      {isAr ? item.subtitleAr : item.subtitleEn}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {isAr ? item.descriptionAr : item.descriptionEn}
                    </p>

                    <div className="space-y-1.5 border-t border-stone-200/80 pt-3">
                      {(isAr ? item.featuresAr : item.featuresEn).slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[11px] text-stone-600">
                          <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => {
                      setCurrentPage('treatments');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider border border-stone-300 text-stone-800 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    {isAr ? 'تفاصيل الإجراء والاستشارة' : 'Treatment Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. WHY CHOOSE TOOTH HUB (Architectural Pillars) */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#F5F2EA] border-b border-[#E5DFCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">
              {isAr ? 'معايير التميز الطبي' : 'Excellence in Practice'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold text-balance">
              {isAr ? 'لماذا يختار المرضى مركز توث هاب؟' : 'Why Patients Choose Tooth Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {isAr
                ? 'نلتزم بأعلى معايير الدقة والتعقيم والراحة لضمان ثقتك وابتسامتك الدائمة.'
                : 'Meticulous attention to clinical details, verified dental technologies, and an empathetic consultation cadence.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CLINIC_HIGHLIGHTS.map((item) => (
              <div key={item.number} className="bg-white border border-[#DFD8C8] p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-serif font-bold text-teal-900 mb-3 tabular-nums">
                    {item.number}.
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 font-serif">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. MEET OUR RESIDENT DOCTORS (Photographic Profiles) */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">
                {isAr ? 'الكادر الطبي المعتمد' : 'Resident Clinical Team'}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold text-balance">
                {isAr ? 'نخبة من طبيبات الأسنان المتخصصات' : 'Meet Our Resident Dental Specialists'}
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('dentists');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-teal-900 pb-1 border-b border-stone-300 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>{isAr ? 'الملفات المهنية الكاملة' : 'View Full Profiles & Clinic Tour'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {DENTISTS.map((dentist) => (
              <div
                key={dentist.id}
                className="bg-[#FAF9F5] border border-[#E7E2D6] overflow-hidden flex flex-col justify-between hover:border-teal-800 transition-colors"
              >
                <div>
                  {/* Doctor Real Photographic Portrait */}
                  <div className="relative h-64 sm:h-72 w-full bg-stone-200 overflow-hidden">
                    <img
                      src={dentist.image}
                      alt={dentist.nameEn}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-teal-900 border border-stone-200">
                      Tooth Hub Resident
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold font-serif text-stone-900 mb-1">
                      {isAr ? dentist.nameAr : dentist.nameEn}
                    </h3>
                    <p className="text-xs font-semibold text-teal-800 mb-3">
                      {isAr ? dentist.titleAr : dentist.titleEn}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed mb-5">
                      {isAr ? dentist.bioAr : dentist.bioEn}
                    </p>

                    <div className="border-t border-stone-200 pt-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1.5">
                        {isAr ? 'أبرز مجالات الممارسة:' : 'Clinical Focus:'}
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {(isAr ? dentist.focusAreasAr : dentist.focusAreasEn).slice(0, 2).map((area, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-800"></span>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setCurrentPage('dentists');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 border border-stone-300 text-xs font-semibold text-stone-800 hover:bg-teal-900 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    {isAr ? 'الملف الشخصي والمؤهلات' : 'Doctor Credentials'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. CLINICAL TEAM & TECHNOLOGY SHOWCASE */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#FAF9F5] border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Staff Showcase */}
          <div className="mb-16 border border-[#DFD8C8] bg-white p-3 sm:p-4">
            <div className="relative overflow-hidden h-72 sm:h-96 w-full bg-stone-100">
              <img
                src={CLINIC_IMAGES.teamStaff}
                alt="Tooth Hub Dental Clinic Staff Team in Al Sayah Bahrain"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  {isAr ? 'فريق الرعاية والضيافة في مركز توث هاب' : 'The Tooth Hub Care & Reception Team'}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {isAr
                    ? 'كادر طبي وتمريضي وإداري متمرس لضمان تجربة علاجية استثنائية لجميع أفراد الأسرة.'
                    : 'Experienced clinical assistants, hygienists, and front-desk coordinators welcoming you in Al Sayah.'}
                </p>
              </div>
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 bg-teal-900 text-white text-xs font-semibold hover:bg-teal-950 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                {isAr ? 'حجز موعد كشف' : 'Schedule Consultation'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-teal-800">
                {isAr ? 'أحدث التقنيات الرقمية' : 'Technology & Clinical Purity'}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold leading-tight text-balance">
                {isAr
                  ? 'دقة رقمية ثلاثية الأبعاد وبروتوكولات تعقيم صارمة.'
                  : 'Precision digital imaging and certified hospital-standard sterilization.'}
              </h2>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {isAr
                  ? 'نعتمد في توث هاب على أحدث أجهزة المسح الضوئي الرقمي ثلاثي الأبعاد لنمنحك تجربة قياس سريعة وخالية من معجون الطبعات التقليدي المزعج، مع خطة علاج بصرية واضحة قبل البدء.'
                  : 'Modern dentistry requires absolute precision. Our digital intraoral scanners eliminate uncomfortable silicone impressions, producing photorealistic 3D dental models within minutes for clear diagnostics.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-stone-900">
                      {isAr ? 'أوتوكلاف فئة B للتعقيم الطبي' : 'Class-B Medical Autoclaving'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {isAr
                        ? 'أجهزة تعقيم بالبخار المضغوط تضمن تعقيم وتغليف الأدوات الفردية لكل مراجع.'
                        : 'Fractionated vacuum steam sterilization exceeding international microbiological safety requirements.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-stone-900">
                      {isAr ? 'تصوير رقمي منخفض الإشعاع' : 'Ultra-Low Radiation Digital Radiography'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {isAr
                        ? 'مجسات رقمية فورية تكشف تفاصيل الجذور والعظام بأدنى معدل تعرض إشعاعي.'
                        : 'Instant intraoral sensors delivering microscopic diagnostic clarity while minimizing radiation exposure.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border border-[#DFD8C8] bg-white p-2">
                  <img
                    src={CLINIC_IMAGES.scannerTech}
                    alt="Tooth Hub digital intraoral 3D scanner"
                    className="w-full h-40 sm:h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  {isAr ? 'ماسح ضوئي بصري ثلاثي الأبعاد' : '3D Optical Digital Scanner'}
                </p>
              </div>

              <div className="space-y-4 pt-6 sm:pt-8">
                <div className="border border-[#DFD8C8] bg-white p-2">
                  <img
                    src={CLINIC_IMAGES.sterilizationLab}
                    alt="Tooth Hub central sterilization and autoclave laboratory"
                    className="w-full h-40 sm:h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  {isAr ? 'وحدة التعقيم المركزي المتطورة' : 'Sterilization & Autoclave Suite'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. AUTHENTIC PATIENT TESTIMONIALS */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-2">
              {isAr ? 'تجارب مراجعينا في البحرين' : 'Patient Experiences'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-950 font-semibold text-balance">
              {isAr ? 'ثقة مبنية على الراحة والدقة' : 'Trusted by Patients Across Muharraq'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF9F5] border border-[#E7E2D6] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-500 text-sm tracking-wider mb-4">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-6 font-serif">
                    "{isAr ? t.quoteAr : t.quoteEn}"
                  </p>
                </div>

                <div className="border-t border-stone-200/80 pt-4">
                  <p className="text-xs font-bold text-stone-900">
                    {isAr ? t.authorAr : t.authorEn}
                  </p>
                  <p className="text-[11px] text-teal-800">
                    {isAr ? t.treatmentAr : t.treatmentEn} · <span className="text-stone-400">{t.date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. INLINE APPOINTMENT SECTION (Directly on Homepage) */}
      <section id="booking-section" className="py-16 sm:py-20 lg:py-28 bg-[#F6F4ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InlineBookingForm language={language} />
        </div>
      </section>
    </div>
  );
};
