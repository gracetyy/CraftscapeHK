import React from 'react';
import type { MessageThread, Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtisanChatroomProps {
  thread: MessageThread;
  product: Product;
  onClose: () => void;
}

const ArtisanChatroom: React.FC<ArtisanChatroomProps> = ({ thread, product, onClose }) => {
  const { language, t } = useLanguage();
  return (
    <div className="h-full w-full bg-[var(--color-bg)] flex flex-col">
      <header className="flex items-center justify-between p-4 flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
        <div className="text-left">
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]">{t('chatroomWith', { name: thread.customerName })}</h1>
        </div>
        <button onClick={onClose} className="bg-[var(--color-surface)] p-2 rounded-full text-[var(--color-text-primary)] border border-[var(--color-border)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>
      
      <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center space-x-3">
          <img src={product.image} alt={product.name[language]} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
          <div>
            <p className="font-semibold text-[var(--color-text-secondary)] text-sm">{t('artisanChatroomProductInquiry')}</p>
            <p className="font-bold text-[var(--color-text-primary)]">{product.name[language]}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Example messages */}
        <div className="flex justify-start">
          <div className="bg-[var(--color-surface)] p-3 rounded-2xl max-w-xs border border-[var(--color-border)]">
            <p>{thread.lastMessage}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[var(--color-primary-accent)] text-white p-3 rounded-2xl max-w-xs">
            <p>你好！無問題，請問有咩可以幫到你？</p>
          </div>
        </div>
         <div className="flex justify-start">
          <div className="bg-[var(--color-surface)] p-3 rounded-2xl max-w-xs border border-[var(--color-border)]">
            <p>我想將上面的龍鳳圖案，換成一對鴛鴦，可以嗎？價錢會唔會唔同？</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[var(--color-surface)]/70 backdrop-blur-xl border-t border-[var(--color-border)]">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={t('chatroomPlaceholder')}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
          />
          <button className="bg-[var(--color-primary-accent)] text-white p-3 rounded-full flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtisanChatroom;
