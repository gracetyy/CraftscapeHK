import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatroomProps {
  artisanName: string;
  onClose: () => void;
}

const Chatroom: React.FC<ChatroomProps> = ({ artisanName, onClose }) => {
  const { t } = useLanguage();
  return (
    <div className="h-full w-full bg-[var(--color-bg)] flex flex-col">
      <header className="flex items-center justify-between p-4 flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
        <div className="text-left">
          <h1 className="text-[22px] font-bold text-[var(--color-text-primary)]">{t('chatroomWith', { name: artisanName })}</h1>
        </div>
        <button onClick={onClose} className="bg-[var(--color-surface)] p-2 rounded-full text-[var(--color-text-primary)] border border-[var(--color-border)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* Message Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Example messages */}
        <div className="flex justify-start">
          <div className="bg-[var(--color-surface)] p-3 rounded-2xl max-w-xs border border-[var(--color-border)]">
            <p>你好，請問關於這件商品，可以訂製嗎？</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[var(--color-primary-accent)] text-white p-3 rounded-2xl max-w-xs">
            <p>你好！可以的，請問有什麼想法嗎？</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
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

export default Chatroom;
