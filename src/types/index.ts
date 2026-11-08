export type Language = 'en' | 'ar';

export type PageId = 'home' | 'treatments' | 'dentists' | 'contact';

export interface TreatmentItem {
  id: string;
  category: 'general' | 'cosmetic' | 'restorative' | 'orthodontics' | 'specialist';
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuresEn: string[];
  featuresAr: string[];
  image: string;
  suitableForEn: string;
  suitableForAr: string;
}

export interface DentistProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  specializationEn: string;
  specializationAr: string;
  bioEn: string;
  bioAr: string;
  focusAreasEn: string[];
  focusAreasAr: string[];
  languagesEn: string[];
  languagesAr: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  category: 'interior' | 'suites' | 'technology' | 'smiles' | 'sterilization';
  titleEn: string;
  titleAr: string;
  captionEn: string;
  captionAr: string;
  image: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  authorEn: string;
  authorAr: string;
  treatmentEn: string;
  treatmentAr: string;
  quoteEn: string;
  quoteAr: string;
  date: string;
  rating: number;
}
