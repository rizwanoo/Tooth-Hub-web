/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { DentistsPage } from './pages/DentistsPage';
import { GalleryContactPage } from './pages/GalleryContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Sync dir and lang on documentElement for full accessibility and font loading
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleBookClick = () => {
    const bookingElement = document.getElementById('inline-booking-form-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on a page without immediate form in view, navigate to contact/appointments page
      setCurrentPage('contact');
      setTimeout(() => {
        const el = document.getElementById('inline-booking-form-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#FAF9F5] text-stone-900 ${
        language === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Cinematic Navbar with Hero integration */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        onBookClick={handleBookClick}
      />

      {/* Main Four-Page Content Switcher */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            language={language}
            setCurrentPage={setCurrentPage}
            onBookClick={handleBookClick}
          />
        )}
        {currentPage === 'treatments' && (
          <TreatmentsPage
            language={language}
            setCurrentPage={setCurrentPage}
            onBookClick={handleBookClick}
          />
        )}
        {currentPage === 'dentists' && (
          <DentistsPage
            language={language}
            setCurrentPage={setCurrentPage}
            onBookClick={handleBookClick}
          />
        )}
        {currentPage === 'contact' && (
          <GalleryContactPage
            language={language}
            setCurrentPage={setCurrentPage}
            onBookClick={handleBookClick}
          />
        )}
      </main>

      {/* Luxury Institutional Footer */}
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        onBookClick={handleBookClick}
      />
    </div>
  );
}
