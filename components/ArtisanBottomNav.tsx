import React from 'react';
import { ArtisanTab } from '../enums';
import { useLanguage } from '../contexts/LanguageContext';

const NavItem: React.FC<{
  label: string;
  tab: ArtisanTab;
  activeTab: ArtisanTab;
  setActiveTab: (tab: ArtisanTab) => void;
  children: (props: { isActive: boolean }) => React.ReactNode;
}> = ({ label, tab, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className="flex flex-col items-center justify-center gap-1 w-full transition-all duration-300 focus:outline-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className={`transition-colors select-none pointer-events-none ${isActive ? 'text-[var(--color-primary-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
        {children({ isActive })}
      </div>
      <span className={`text-xs font-medium transition-colors ${isActive ? 'text-[var(--color-primary-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
        {label}
      </span>
    </button>
  );
};

const ArtisanBottomNav: React.FC<{ activeTab: ArtisanTab; setActiveTab: (tab: ArtisanTab) => void; }> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  return (
    <nav className="bg-[var(--color-surface)] border-t border-[var(--color-border)] h-20 flex items-center justify-around px-2 pb-2">
      <NavItem label={t('artisanNavDashboard')} tab={ArtisanTab.Dashboard} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 25 25" className="w-full h-full" fill="currentColor">
              <path d="M9.5 5.75C9.91421 5.75 10.25 5.41421 10.25 5C10.25 4.58579 9.91421 4.25 9.5 4.25V5.75ZM4.75 11C4.75 11.4142 5.08579 11.75 5.5 11.75C5.91421 11.75 6.25 11.4142 6.25 11H4.75ZM9.5 4.25C9.08579 4.25 8.75 4.58579 8.75 5C8.75 5.41421 9.08579 5.75 9.5 5.75V4.25ZM18.75 11C18.75 11.4142 19.0858 11.75 19.5 11.75C19.9142 11.75 20.25 11.4142 20.25 11H18.75ZM10.25 5C10.25 4.58579 9.91421 4.25 9.5 4.25C9.08579 4.25 8.75 4.58579 8.75 5H10.25ZM8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75C9.91421 11.75 10.25 11.4142 10.25 11H8.75ZM9.5 11.75C9.91421 11.75 10.25 11.4142 10.25 11C10.25 10.5858 9.91421 10.25 9.5 10.25V11.75ZM5.5 10.25C5.08579 10.25 4.75 10.5858 4.75 11C4.75 11.4142 5.08579 11.75 5.5 11.75V10.25ZM9.5 10.25C9.08579 10.25 8.75 10.5858 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75V10.25ZM19.5 11.75C19.9142 11.75 20.25 11.4142 20.25 11C20.25 10.5858 19.9142 10.25 19.5 10.25V11.75ZM6.25 11C6.25 10.5858 5.91421 10.25 5.5 10.25C5.08579 10.25 4.75 10.5858 4.75 11H6.25ZM20.25 11C20.25 10.5858 19.9142 10.25 19.5 10.25C19.0858 10.25 18.75 10.5858 18.75 11H20.25ZM9.5 4.25C6.87665 4.25 4.75 6.37665 4.75 9H6.25C6.25 7.20507 7.70507 5.75 9.5 5.75V4.25ZM4.75 9V11H6.25V9H4.75ZM9.5 5.75H15.5V4.25H9.5V5.75ZM15.5 5.75C17.2949 5.75 18.75 7.20507 18.75 9H20.25C20.25 6.37665 18.1234 4.25 15.5 4.25V5.75ZM18.75 9V11H20.25V9H18.75ZM8.75 5V11H10.25V5H8.75ZM9.5 10.25H5.5V11.75H9.5V10.25ZM9.5 11.75H19.5V10.25H9.5V11.75ZM4.75 11V15H6.25V11H4.75ZM4.75 15C4.75 17.6234 6.87665 19.75 9.5 19.75V18.25C7.70507 18.25 6.25 16.7949 6.25 15H4.75ZM9.5 19.75H15.5V18.25H9.5V19.75ZM15.5 19.75C18.1234 19.75 20.25 17.6234 20.25 15H18.75C18.75 16.7949 17.2949 18.25 15.5 18.25V19.75ZM20.25 15V11H18.75V15H20.25Z" />
            </svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('artisanNavProducts')} tab={ArtisanTab.Products} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('artisanNavMessages')} tab={ArtisanTab.Messages} activeTab={activeTab} setActiveTab={setActiveTab}>
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
              <path d="M7.76953 4.58009C8.57706 3.74781 9.54639 3.08958 10.6178 2.64588C11.6892 2.20219 12.84 1.98233 13.9995 2.00001C18.4195 2.00001 21.9995 5.10005 21.9995 8.92005C21.9792 9.98209 21.7021 11.0234 21.1919 11.9551C20.6817 12.8867 19.9535 13.681 19.0696 14.27V16.75" />
              <path d="M16 13.64C16 10.29 12.87 7.58008 9 7.58008C5.13 7.58008 2 10.29 2 13.64C2.01941 14.5684 2.26227 15.4785 2.70789 16.2931C3.1535 17.1077 3.78881 17.803 4.56006 18.3201V20.49C4.55903 20.7858 4.64489 21.0755 4.80701 21.3229C4.96912 21.5703 5.20032 21.7647 5.47192 21.8818C5.74353 21.999 6.04362 22.0338 6.33484 21.9819C6.62606 21.9301 6.89553 21.7938 7.10999 21.5901L9.10999 19.6901C12.94 19.6201 16 16.94 16 13.64Z" />
            </svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('artisanNavOrders')} tab={ArtisanTab.Orders} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          </div>
        )}
      </NavItem>
      <NavItem label={t('artisanNavSettings')} tab={ArtisanTab.Settings} activeTab={activeTab} setActiveTab={setActiveTab}>
        {({ isActive }) => (
          <div className="w-7 h-7 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          </div>
        )}
      </NavItem>
    </nav>
  );
};

export default ArtisanBottomNav;
