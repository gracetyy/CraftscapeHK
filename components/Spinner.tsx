import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Spinner: React.FC<{ text?: string }> = ({ text }) => {
    const { t } = useLanguage();
    const displayText = text || t('loading');
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-[var(--color-primary-accent)]">
            <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            {displayText && <p className="mt-2 text-[17px]">{displayText}</p>}
        </div>
    );
};

export default Spinner;
