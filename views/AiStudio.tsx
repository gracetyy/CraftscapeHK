import React, { useState, useCallback } from 'react';
import type { Craft } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { generateCraftImage } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface AiStudioProps {
  craft: Craft;
  onClose: () => void;
}

const AiStudio: React.FC<AiStudioProps> = ({ craft, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addAiCreation } = useAppContext();
  const { language, t } = useLanguage();

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError(t('aiStudioErrorPrompt'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateCraftImage(craft.name[language], prompt);
      setGeneratedImage(imageUrl);
      addAiCreation({
          craftId: craft.id,
          craftName: craft.name[language],
          prompt: prompt,
          imageUrl: imageUrl,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('aiStudioErrorGeneric'));
    } finally {
      setIsLoading(false);
    }
  }, [prompt, craft, addAiCreation, language, t]);

  return (
    <div className="h-full w-full bg-[var(--color-bg)] flex flex-col overflow-y-auto">
      <header className="flex items-center justify-between p-4 flex-shrink-0 border-b border-[var(--color-border)]">
        <div className="text-left">
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]">{t('aiStudioTitle')}</h1>
          <p className="text-[17px] text-[var(--color-primary-accent)] font-semibold">{craft.name[language]}</p>
        </div>
        <button onClick={onClose} className="bg-[var(--color-surface)] p-2 rounded-full text-[var(--color-text-primary)] border border-[var(--color-border)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="flex-grow p-4 flex flex-col justify-between">
        <div className="w-full aspect-[3/4] bg-[var(--color-secondary-accent)]/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-[var(--color-secondary-accent)]">
          {isLoading && (
            <div className="text-center">
                <div className="w-8 h-8 border-4 border-[var(--color-primary-accent)] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-2 text-[var(--color-primary-accent)]">{t('aiStudioLoading')}</p>
            </div>
          )}
          {error && <p className="text-[var(--color-error)] p-4 text-center">{error}</p>}
          {generatedImage && <img src={generatedImage} alt="AI generated craft" className="w-full h-full object-contain rounded-2xl"/>}
          {!isLoading && !generatedImage && !error && (
            <div className="text-center text-[var(--color-text-secondary)] p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <p className="mt-2 text-[17px]">{t('aiStudioPlaceholder')}</p>
            </div>
          )}
        </div>
        
        {generatedImage && (
             <div className="bg-[var(--color-surface)] p-4 rounded-xl text-center mt-4 border border-[var(--color-border)] ios-shadow">
                <h3 className="text-[17px] font-semibold text-[var(--color-primary-accent)]">{t('aiStudioCtaTitle')}</h3>
                <button className="mt-2 bg-[var(--color-primary-accent)] text-white font-semibold py-2 px-5 rounded-full text-[15px] hover:opacity-80 transition-colors">
                    {t('aiStudioCtaButton')}
                </button>
            </div>
        )}

        <div className="mt-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('aiStudioInputPlaceholder')}
            rows={3}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)] resize-none"
            disabled={isLoading}
          />
          <button 
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className="w-full mt-2 bg-[var(--color-primary-accent)] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 hover:scale-105 disabled:bg-[var(--color-secondary-accent)] disabled:cursor-not-allowed disabled:scale-100">
            {isLoading ? t('aiStudioGenerating') : t('aiStudioGenerate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiStudio;
