import React, { useState } from 'react';
import { CLINIC_INFO, DENTISTS, TREATMENTS } from '../data/content';
import { Language } from '../types';
import { Calendar, Clock, User, Phone, Mail, Stethoscope, MessageSquare, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface InlineBookingFormProps {
  language: Language;
  preselectedTreatmentId?: string;
  preselectedDentistId?: string;
}

export const InlineBookingForm: React.FC<InlineBookingFormProps> = ({
  language,
  preselectedTreatmentId = '',
  preselectedDentistId = '',
}) => {
  const isAr = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState(preselectedTreatmentId);
  const [selectedDentist, setSelectedDentist] = useState(preselectedDentistId);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = isAr ? 'يرجى إدخال الاسم الكريم' : 'Please enter your full name';
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = isAr ? 'يرجى إدخال رقم الهاتف للتواصل' : 'Please provide your contact phone number';
    } else if (cleanPhone.length < 8) {
      errs.phone = isAr ? 'يرجى إدخال رقم هاتف صحيح (8 أرقام على الأقل)' : 'Please enter a valid 8-digit phone number';
    }
    if (!selectedTreatment) {
      errs.selectedTreatment = isAr ? 'يرجى اختيار نوع العلاج أو الاستشارة' : 'Please select a treatment or consultation type';
    }
    if (!preferredDate) {
      errs.preferredDate = isAr ? 'يرجى تحديد التاريخ المفضل للموعد' : 'Please select a preferred appointment date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        fullName,
        phone,
        email,
        treatment: TREATMENTS.find((t) => t.id === selectedTreatment),
        dentist: DENTISTS.find((d) => d.id === selectedDentist),
        preferredDate,
        preferredTime,
        notes,
        submittedAt: new Date().toLocaleTimeString(),
      };
      setSubmissionData(data);
      setSubmitted(true);
    }
  };

  const generateWhatsAppLink = () => {
    const treatmentObj = TREATMENTS.find((t) => t.id === selectedTreatment);
    const dentistObj = DENTISTS.find((d) => d.id === selectedDentist);

    const treatmentTitle = treatmentObj ? (isAr ? treatmentObj.titleAr : treatmentObj.titleEn) : (isAr ? 'استشارة عامة' : 'Consultation');
    const doctorName = dentistObj ? (isAr ? dentistObj.nameAr : dentistObj.nameEn) : (isAr ? 'أي طبيب متاح' : 'Any Specialist');
    const timeSlotLabel = preferredTime === 'morning' ? (isAr ? 'صباحاً (9ص - 1ظ)' : 'Morning (9am - 1pm)') : preferredTime === 'afternoon' ? (isAr ? 'ظهراً (1ظ - 5م)' : 'Afternoon (1pm - 5pm)') : (isAr ? 'مساءً (5م - 9م)' : 'Evening (5pm - 9pm)');

    const text = isAr
      ? `مرحباً مركز توث هاب لطب الأسنان،\nأود طلب موعد كالتالي:\n- الاسم: ${fullName || 'مراجع جديد'}\n- الهاتف: ${phone || 'غير محدد'}\n- الخدمة: ${treatmentTitle}\n- الطبيب المفضل: ${doctorName}\n- التاريخ المفضل: ${preferredDate || 'في أقرب وقت'}\n- الفترة: ${timeSlotLabel}\n${notes ? `- ملاحظات: ${notes}` : ''}`
      : `Hello Tooth Hub Speciality Dental Centre,\nI would like to request an appointment:\n- Patient: ${fullName || 'New Patient'}\n- Phone: ${phone || 'Not specified'}\n- Treatment: ${treatmentTitle}\n- Preferred Dentist: ${doctorName}\n- Preferred Date: ${preferredDate || 'Earliest available'}\n- Time Slot: ${timeSlotLabel}\n${notes ? `- Notes: ${notes}` : ''}`;

    return `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div id="inline-booking-form-section" className="bg-white border border-[#E7E2D6] p-4 sm:p-8 lg:p-10 shadow-xs relative w-full max-w-full overflow-hidden">
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
          <span>{isAr ? 'طلب موعد فوري' : 'Direct Appointment Request'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'الساية – البسيتين' : 'Al Sayah, Muharraq'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-semibold mb-2 text-balance">
          {isAr ? 'احجز موعد استشارتك مع أطباء توث هاب' : 'Reserve Your Consultation at Tooth Hub'}
        </h2>
        <p className="text-stone-600 text-sm leading-relaxed">
          {isAr
            ? 'املأ النموذج أدناه لتحديد موعدك، أو تواصل معنا مباشرة عبر الواتساب أو الهاتف. نقوم بالاتصال بك فوراً لتأكيد الوقت والعيادة المناسبة.'
            : 'Complete the form below to request your consultation slot. Our clinic reception team will contact you directly to confirm timing and room allocation.'}
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#F7F9F7] border border-emerald-300 p-6 sm:p-8 text-stone-900 animate-fadeIn">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-emerald-950 font-serif">
                {isAr ? 'تم استلام طلب الموعد بنجاح' : 'Appointment Request Received'}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {isAr
                  ? `شكراً لك، عزيزنا ${submissionData.fullName}. تم تسجيل طلبك لخدمة (${
                      submissionData.treatment ? submissionData.treatment.titleAr : 'الاستشارة'
                    }) بتاريخ ${submissionData.preferredDate}. سيتواصل معك فريق الاستقبال هاتفياً على الرقم (${submissionData.phone}) لتأكيد موعدك النهائي.`
                  : `Thank you, ${submissionData.fullName}. We have received your request for (${
                      submissionData.treatment ? submissionData.treatment.titleEn : 'Consultation'
                    }) on ${submissionData.preferredDate}. Our reception desk will call you at (${submissionData.phone}) shortly to confirm scheduling.`}
              </p>

              <div className="pt-2 text-xs text-stone-500 border-t border-emerald-200 flex flex-wrap gap-x-4 gap-y-1">
                <span>{isAr ? 'تأكيد الحضور:' : 'Notice:'} {isAr ? 'المواعيد معتمدة بعد تأكيد موظف الاستقبال فقط' : 'Appointments are officially confirmed upon desk verification'}</span>
                <span>·</span>
                <span>{isAr ? 'ساعات العمل: السبت - الخميس (9ص - 9م)' : 'Hours: Sat-Thu 9am-9pm'}</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-800 text-white text-xs font-semibold tracking-wide hover:bg-emerald-900 transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إرسال نسخة مباشرة عبر الواتساب' : 'Forward Details to WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhone('');
                    setEmail('');
                    setNotes('');
                  }}
                  className="px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  {isAr ? 'حجز موعد جديد' : 'Submit Another Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? 'مثال: محمد عبدالله' : 'e.g. Sarah Jenkins'}
                  className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border transition-colors focus:bg-white focus:outline-hidden ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-stone-300 focus:border-teal-800'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'رقم الهاتف (البحرين) *' : 'Phone Number (Bahrain) *'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isAr ? '3886 0066 أو 1733 1999' : '+973 3886 0066'}
                  className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border transition-colors focus:bg-white focus:outline-hidden ${
                    errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-stone-300 focus:border-teal-800'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'name@example.com' : 'patient@example.com'}
                  className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border border-stone-300 transition-colors focus:bg-white focus:border-teal-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Select Treatment */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'الخدمة أو العلاج المطلوب *' : 'Select Treatment / Consultation *'}
              </label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border transition-colors focus:bg-white focus:outline-hidden ${
                    errors.selectedTreatment ? 'border-rose-500' : 'border-stone-300 focus:border-teal-800'
                  }`}
                >
                  <option value="">{isAr ? '-- اختر نوع الخدمة --' : '-- Select Treatment --'}</option>
                  {TREATMENTS.map((treatment) => (
                    <option key={treatment.id} value={treatment.id}>
                      {isAr ? treatment.titleAr : treatment.titleEn}
                    </option>
                  ))}
                  <option value="general-consult">
                    {isAr ? 'فحص واستشارة عامة شاملة' : 'General Diagnostic Consultation'}
                  </option>
                </select>
              </div>
              {errors.selectedTreatment && <p className="text-rose-600 text-xs mt-1">{errors.selectedTreatment}</p>}
            </div>

            {/* Preferred Dentist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'الطبيب المفضل' : 'Preferred Practitioner'}
              </label>
              <select
                value={selectedDentist}
                onChange={(e) => setSelectedDentist(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-stone-50/50 border border-stone-300 transition-colors focus:bg-white focus:border-teal-800 focus:outline-hidden"
              >
                <option value="">{isAr ? 'أي طبيب متخصص متاح' : 'Any Available Specialist'}</option>
                {DENTISTS.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {isAr ? `${dentist.nameAr} (${dentist.specializationAr})` : `${dentist.nameEn} (${dentist.specializationEn})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {isAr ? 'التاريخ المفضل *' : 'Preferred Date *'}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                <input
                  type="date"
                  min={todayStr}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border transition-colors focus:bg-white focus:outline-hidden ${
                    errors.preferredDate ? 'border-rose-500' : 'border-stone-300 focus:border-teal-800'
                  }`}
                />
              </div>
              {errors.preferredDate && <p className="text-rose-600 text-xs mt-1">{errors.preferredDate}</p>}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              {isAr ? 'الفترة الزمنية المفضلة (السبت - الخميس)' : 'Preferred Time Slot (Saturday – Thursday)'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'morning', labelEn: 'Morning (9:00 AM – 1:00 PM)', labelAr: 'الصباح (9:00 ص – 1:00 ظ)' },
                { id: 'afternoon', labelEn: 'Afternoon (1:00 PM – 5:00 PM)', labelAr: 'الظهيرة (1:00 ظ – 5:00 م)' },
                { id: 'evening', labelEn: 'Evening (5:00 PM – 9:00 PM)', labelAr: 'المساء (5:00 م – 9:00 م)' },
              ].map((slot) => {
                const active = preferredTime === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setPreferredTime(slot.id)}
                    className={`py-2 px-3 text-xs font-medium border text-left rtl:text-right transition-colors cursor-pointer flex items-center justify-between ${
                      active
                        ? 'border-teal-800 bg-teal-50/60 text-teal-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span>{isAr ? slot.labelAr : slot.labelEn}</span>
                    <Clock className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes / Special Requests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              {isAr ? 'ملاحظات أو استفسارات إضافية' : 'Additional Notes or Clinical Questions'}
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  isAr
                    ? 'هل تعاني من حساسية معينة أو ألم محدد؟ شاركنا أي تفاصيل لمساعدتنا في الاستعداد لاستقبالك.'
                    : 'Any tooth sensitivity, previous treatment history, or specific requests you would like our doctors to know in advance.'
                }
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-sm bg-stone-50/50 border border-stone-300 transition-colors focus:bg-white focus:border-teal-800 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Notice & Zero-Popup Assurance */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-800">
                {isAr ? 'سياسة تأكيد المواعيد في توث هاب:' : 'Tooth Hub Appointment Confirmation Policy:'}
              </p>
              <p>
                {isAr
                  ? 'يتم تثبيت الموعد بصورة نهائية بعد قيام موظف الاستقبال بالتواصل معكم هاتفياً للتأكد من الموعد والعيادة الشاغرة. لا توجد نوافذ منبثقة أو تأكيدات عشوائية.'
                  : 'Appointments are finalized directly by clinic personnel to ensure unhurried, dedicated room preparation. No automated popups or misleading auto-confirmations.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-900 text-white font-semibold text-sm hover:bg-teal-950 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'إرسال طلب الحجز' : 'Submit Appointment Request'}</span>
            </button>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'طلب فوري عبر الواتساب (3886 0066)' : 'Instant WhatsApp Request (+973 3886 0066)'}</span>
            </a>

            <a
              href={`tel:${CLINIC_INFO.landlineRaw}`}
              className="px-5 py-3 border border-stone-300 bg-white text-stone-800 font-semibold text-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-800" />
              <span className="tabular-nums">1733 1999</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
