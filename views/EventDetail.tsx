

import React from 'react';
import type { Event } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  const { language, t } = useLanguage();

  const getTranslatedRegion = (region: Event['region']) => {
    const map = { '港島': 'regionHK', '九龍': 'regionKLN', '新界': 'regionNT', '線上': 'regionOnline' };
    return t(map[region] as any);
  }

  return (
    <div className="h-full w-full bg-[var(--color-page-bg)] flex flex-col overflow-y-auto">
      <header className="relative h-2/5 flex-shrink-0">
        <img src={event.image} alt={event.title[language]} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-page-bg)] to-transparent"></div>
        <button onClick={onClose} className="absolute top-6 left-4 bg-black/20 p-2 rounded-full text-white backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{event.title[language]}</h1>
            <p className="text-lg text-[var(--color-primary-accent)] font-semibold">{event.organizer}</p>
        </div>
      </header>
      
      <div className="p-6 flex-grow space-y-6 text-[var(--color-text-primary)]">
        <section className="bg-[var(--color-surface)] p-4 rounded-2xl border border-[var(--color-border)] ios-shadow">
            <div className="flex items-center space-x-4">
                <div className="bg-[var(--color-secondary-accent)] p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-[17px]">{event.date}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{event.time[language]}</p>
                </div>
            </div>
            <div className="border-t border-[var(--color-border)] my-3"></div>
            <div className="flex items-center space-x-4">
                <div className="bg-[var(--color-secondary-accent)] p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                    <h3 className="font-semibold text-[17px]">{event.location[language]}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{getTranslatedRegion(event.region)}</p>
                </div>
            </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{t('eventDetailTitle')}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--color-text-secondary)]">{event.description[language]}</p>
        </section>
      </div>

       <div className="p-4 bg-[var(--color-surface)]/70 backdrop-blur-xl border-t border-[var(--color-border)] sticky bottom-0">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--color-primary-accent)] text-white text-center font-bold py-4 px-6 rounded-xl transition-transform duration-300 hover:scale-105"
          >
            {t('eventDetailButton')}
          </a>
        </div>
    </div>
  );
};

export default EventDetail;
