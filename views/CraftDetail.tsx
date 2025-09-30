import React from 'react';
import type { Craft } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// Fix: Define CraftDetailProps interface
interface CraftDetailProps {
  craft: Craft;
  onClose: () => void;
  onStartCreation: () => void;
  onStartTextLab?: () => void;
}

const CraftDetail: React.FC<CraftDetailProps> = ({ craft, onClose, onStartCreation, onStartTextLab }) => {
  const { language, t } = useLanguage();
  const isLetterpress = craft.category === 'letterpress';

  return (
    <div className="h-full w-full bg-[var(--color-page-bg)] flex flex-col overflow-y-auto">
      <header className="relative h-2/5 flex-shrink-0">
        <img src={craft.images[1]} alt={craft.name[language]} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-page-bg)] to-transparent"></div>
        <button onClick={onClose} className="absolute top-6 left-4 bg-black/20 p-2 rounded-full text-white backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{craft.name[language]}</h1>
            <p className="text-lg text-[var(--color-primary-accent)] font-semibold">{craft.artisan[language]}</p>
        </div>
      </header>
      
      <div className="p-6 flex-grow space-y-8 text-[var(--color-text-primary)] pb-24">
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{t('craftDetailIntro')}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--color-text-secondary)]">{craft.full_description[language]}</p>
        </section>

        <div className="bg-[var(--color-surface)] p-6 rounded-2xl text-center border border-[var(--color-border)] ios-shadow">
          <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)]">{t('craftDetailCtaTitle')}</h3>
          <p className="text-[17px] text-[var(--color-text-secondary)] mt-2 mb-4">
            {isLetterpress 
              ? (language === 'zh' 
                  ? '使用我們的 AI 工具設計您的專屬活字印刷作品，結合傳統工藝與現代創意。' 
                  : 'Use our AI tools to design your custom letterpress text layout, combining traditional craftsmanship with modern creativity.')
              : t('craftDetailCtaDesc')
            }
          </p>
          <button 
            onClick={isLetterpress && onStartTextLab ? onStartTextLab : onStartCreation}
            className="bg-[var(--color-primary-accent)] text-white font-bold py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105">
            {t('craftDetailCtaButton')}
          </button>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{t('craftDetailHistory')}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--color-text-secondary)]">{craft.history[language]}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{t('craftDetailStory')}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--color-text-secondary)]">{craft.story[language]}</p>
        </section>
      </div>
    </div>
  );
};

export default CraftDetail;
