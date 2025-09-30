import React from 'react';
import { Tab } from '../enums';
import { useLanguage } from '../contexts/LanguageContext';

const NavItem: React.FC<{
  label: string;
  tab: Tab;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  children: (props: { isActive: boolean }) => React.ReactNode;
}> = ({ label, tab, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className="flex flex-col items-center justify-center gap-1 w-full transition-all duration-300 pt-0 active:scale-100 focus:outline-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className={`transition-colors select-none pointer-events-none ${isActive ? 'text-[var(--color-primary-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
        {children({ isActive })}
      </div>
      <span className={`mt-1 text-xs font-medium leading-none transition-colors ${isActive ? 'text-[var(--color-primary-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
        {label}
      </span>
    </button>
  );
};

const BottomNav: React.FC<{ activeTab: Tab; setActiveTab: (tab: Tab) => void; }> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  return (
    <nav className="relative bg-[var(--color-surface)] border-t border-[var(--color-border)] h-16 grid grid-cols-4 items-end px-4 pt-1 pb-1">
      {/* Removed translucency and blur for a solid, non-glass bar */}
      <NavItem label={t('navPlay')} tab={Tab.Play} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-4.5-9 4.5V16.5L12 21l9-4.5V7.5Zm-9-3.75v6.75M3.75 7.5l8.25 3.75 8.25-3.75"/></svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('navMarketplace')} tab={Tab.Marketplace} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 11V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V11" />
              <path d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" />
              <path d="M3.32975 5.35133C3.50783 4.46093 3.59687 4.01573 3.77791 3.65484C4.15938 2.89439 4.84579 2.33168 5.66628 2.10675C6.05567 2 6.50969 2 7.41771 2H9.50002L8.77549 9.24527C8.61911 10.8091 7.30318 12 5.73155 12C3.8011 12 2.35324 10.2339 2.73183 8.34093L3.32975 5.35133Z" />
              <path d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" />
              <path d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5" />
            </svg>
          </div>
        )}
      </NavItem>

      {/* Promoted center action: Flip-card Explore (as part of nav) */}
      <button
        onClick={() => setActiveTab(Tab.Explore)}
        aria-label="Open swipe-card Explore"
        className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-[var(--color-primary-accent)] text-white ios-shadow ring-4 ring-[var(--color-bg)] active:scale-95 transition-transform flex items-center justify-center shadow-lg shadow-[var(--color-primary-accent)]/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="none"
          stroke="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" fill="white" />
          <polygon
            points="14.121 14.121 7.05 16.95 9.879 9.879 16.95 7.05"
            fill="var(--color-primary-accent)"
          />
        </svg>
      </button>
      <NavItem label={t('navExplore')} tab={Tab.Events} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" />
            </svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('navProfile')} tab={Tab.Profile} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        )}
      </NavItem>
    </nav>
  );
};

export default BottomNav;
