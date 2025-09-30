import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getCrafts } from '../services/apiService';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import type { Craft } from '../types';
import Spinner from '../components/Spinner';
import { useLanguage } from '../contexts/LanguageContext';

type ProfileTab = 'favorites' | 'creations';

const bentoLayoutClasses = [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-1',
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
];

const SettingsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        className="h-6 w-6 text-[var(--color-text-secondary)]"
        fill="currentColor"
    >
        <path d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" />
    </svg>
);

interface ProfileProps {
    onToggleArtisanMode: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onToggleArtisanMode }) => {
    const { favorites, aiCreations } = useAppContext();
    const { language, setLanguage, t } = useLanguage();
    const [activeTab, setActiveTab] = useState<ProfileTab>('favorites');
    const [allCrafts, setAllCrafts] = useState<Craft[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'favorites') {
            setIsLoading(true);
            getCrafts().then(data => {
                setAllCrafts(data);
                setIsLoading(false);
            });
        }
    }, [activeTab]);

    const favoriteCrafts = allCrafts.filter(craft => favorites.has(craft.id));
    const tabs = [{ id: 'favorites', label: t('profileTabFavorites') }, { id: 'creations', label: t('profileTabCreations') }];

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto">
            <header className="p-6 pt-10">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="https://picsum.photos/seed/user/200/200" alt="User Avatar" className="w-20 h-20 rounded-full border-2 border-[var(--color-primary-accent)]"/>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('profileTitle')}</h1>
                            <p className="text-[17px] text-[var(--color-text-secondary)]">{t('profileStats', { favorites: favorites.size, creations: aiCreations.length })}</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2">
                        <button className="w-10 h-10 rounded-full p-2 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors"><SettingsIcon /></button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            
            <div className="px-6 mt-4">
                <button
                    onClick={onToggleArtisanMode}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-center font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-[var(--color-secondary-accent)] text-[var(--color-primary-accent)] ios-shadow"
                >
                    {t('profileSwitchToArtisan')}
                </button>
            </div>
            
            <div className="px-6 mt-6">
                <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">{t('profileLanguageSetting')}</h2>
                <div className="relative flex bg-[var(--color-secondary-accent)] p-1 rounded-xl">
                    <button
                        onClick={() => setLanguage('zh')}
                        className={`relative w-full py-2.5 rounded-lg text-[15px] font-semibold transition-colors duration-300 z-10 ${language === 'zh' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                    >
                        {language === 'zh' && (
                            <motion.div
                                layoutId="languageBubble"
                                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg ios-shadow"
                                style={{ borderRadius: '0.5rem' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative">繁體中文</span>
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`relative w-full py-2.5 rounded-lg text-[15px] font-semibold transition-colors duration-300 z-10 ${language === 'en' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                    >
                        {language === 'en' && (
                            <motion.div
                                layoutId="languageBubble"
                                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg ios-shadow"
                                style={{ borderRadius: '0.5rem' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative">English</span>
                    </button>
                </div>
            </div>

            <div className="px-6 mt-6">
                <div className="relative flex bg-[var(--color-secondary-accent)] p-1 rounded-xl">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as ProfileTab)}
                            className={`relative w-full py-2.5 rounded-lg text-[15px] font-semibold transition-colors duration-300 z-10 ${activeTab === tab.id ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
                        >
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="profileTabBubble" 
                                    className="absolute inset-0 bg-[var(--color-surface)] rounded-lg ios-shadow"
                                    style={{ borderRadius: '0.5rem' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
                                />
                            )}
                            <span className="relative">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow p-6 pb-24">
                {activeTab === 'favorites' && (
                    isLoading ? <Spinner /> : (
                    <div className="grid grid-cols-2 grid-flow-dense auto-rows-fr gap-4">
                        {favoriteCrafts.length > 0 ? favoriteCrafts.map((craft, index) => (
                            <div key={craft.id} className={`${bentoLayoutClasses[index % bentoLayoutClasses.length]} bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] ios-shadow aspect-square`}>
                                <img src={craft.images[0]} alt={craft.name[language]} className="w-full h-full object-cover"/>
                            </div>
                        )) : <p className="col-span-2 text-center text-[var(--color-text-secondary)] mt-8 text-[17px]">{t('profileFavoritesEmpty')}</p>}
                    </div>
                    )
                )}
                {activeTab === 'creations' && (
                    <div className="grid grid-cols-2 gap-4">
                        {aiCreations.map(creation => (
                            <div key={creation.id} className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] ios-shadow">
                                <img src={creation.imageUrl} alt={creation.prompt} className="w-full h-40 object-cover"/>
                                <div className="p-3">
                                    <p className="text-[15px] font-semibold text-[var(--color-primary-accent)]">{creation.craftName}</p>
                                    <p className="text-[15px] text-[var(--color-text-secondary)] truncate mt-1">{creation.prompt}</p>
                                </div>
                            </div>
                        ))}
                         {aiCreations.length === 0 && <p className="col-span-2 text-center text-[var(--color-text-secondary)] mt-8 text-[17px]">{t('profileCreationsEmpty')}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
