import React, { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { getCrafts } from '../services/apiService';
import type { Craft } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import Spinner from '../components/Spinner';

const CraftCard: React.FC<{
    craft: Craft;
    onLike: () => void;
    onDislike: () => void;
    isTop: boolean;
}> = ({ craft, onLike, onDislike, isTop }) => {
    const { toggleFavorite, isFavorite } = useAppContext();
    const { language } = useLanguage();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-20, 20]);
    const scale = useTransform(y, [0, -200], [1, 1.05]);
    const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);

    const handleDragEnd = useCallback((event: any, info: any) => {
        const swipeThreshold = 100;
        
        if (info.offset.x > swipeThreshold) {
            animate(x, 300, {
                type: 'spring',
                stiffness: 400,
                damping: 40,
                onComplete: () => {
                    onLike();
                    y.set(0);
                },
            });
        } else if (info.offset.x < -swipeThreshold) {
            animate(x, -300, {
                type: 'spring',
                stiffness: 400,
                damping: 40,
                onComplete: () => {
                    onDislike();
                    y.set(0);
                },
            });
        } else {
            // Animate back to center if not a decisive swipe
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
            animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
        }
    }, [x, y, onLike, onDislike]);

    const handleHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(craft.id);
    };

    return (
        <motion.div
            className="tinder-card absolute w-full h-full cursor-grab"
            style={{ x, y, rotate, opacity, scale }}
            drag={isTop}
            dragDirectionLock={isTop}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileTap={{ cursor: "grabbing" }}
            animate={{ scale: isTop ? 1 : 0.95 }}
            transition={{ type: 'spring', duration: 0.2 }}
        >
            <div className="relative w-full h-full rounded-3xl overflow-hidden ios-shadow">
                <img src={craft.images[0]} alt={craft.name[language]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                    <h2 className="text-[17px] font-semibold text-white">{craft.name[language]}</h2>
                    <p className="text-[17px] text-gray-200">{craft.artisan[language]}</p>
                    <p className="mt-2 text-[17px] text-gray-300">{craft.short_description[language]}</p>
                </div>
                <button 
                    onClick={handleHeartClick}
                    className="heart-button absolute top-4 right-4 bg-white/30 p-3 rounded-full text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/40">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite(craft.id) ? 'var(--color-primary-accent)' : 'none'} className="w-7 h-7" stroke="var(--color-primary-accent)" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

interface ExploreProps {
  onShowDetails: (craft: Craft) => void;
}

const Explore: React.FC<ExploreProps> = ({ onShowDetails }) => {
    const [crafts, setCrafts] = useState<Craft[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getCrafts();
                setCrafts(data);
            } catch (error) {
                console.error('Error fetching crafts:', error);
                // Keep empty array as fallback
                setCrafts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const topCraft = crafts.length > 0 ? crafts[0] : null;

    const removeTopCard = useCallback(() => {
        setCrafts(prevCrafts => prevCrafts.slice(1));
    }, []);
    
    const handleLike = useCallback(() => {
        if (topCraft) {
            onShowDetails(topCraft);
        }
        removeTopCard();
    }, [topCraft, onShowDetails, removeTopCard]);
    
    const handleDislike = removeTopCard;

    if (isLoading) {
        return <Spinner text={t('spinnerExplore')} />;
    }

    return (
        <div className="w-full min-h-[100svh] grid place-items-center bg-[var(--color-bg)] relative py-10">
            <div className="w-full max-w-sm aspect-[3/4] relative">
                {crafts.length > 0 ? (
                    crafts.map((craft, index) => {
                        const isTop = index === 0;
                        return (
                            <CraftCard
                                key={craft.id}
                                craft={craft}
                                onLike={handleLike}
                                onDislike={handleDislike}
                                isTop={isTop}
                            />
                        );
                    }).reverse()
                ) : (
                    <div className="text-center text-[var(--color-text-secondary)] bg-[var(--color-surface)] p-8 rounded-2xl ios-shadow">
                        <h3 className="text-[17px] font-semibold mb-2">{t('exploreEmptyTitle')}</h3>
                        <p className="text-[17px]">{t('exploreEmptyDesc')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
