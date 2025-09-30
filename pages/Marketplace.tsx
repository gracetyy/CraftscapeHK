

import React, { useState, useMemo, useEffect } from 'react';
import { getProducts } from '../services/apiService';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ProductCard: React.FC<{ product: Product, onSelect: () => void }> = ({ product, onSelect }) => {
    const { language } = useLanguage();
    return (
        <button onClick={onSelect} className="bg-[var(--color-surface)] rounded-2xl overflow-hidden ios-shadow border border-transparent hover:border-[var(--color-border)] transition-colors text-left flex flex-col">
            <img src={product.image} alt={product.name[language]} className="w-full h-48 object-cover"/>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-[17px] truncate text-[var(--color-text-primary)]">{product.name[language]}</h3>
                <p className="text-[var(--color-text-secondary)] text-[17px]">{product.artisan[language]}</p>
                <div className="flex-grow"></div>
                <div className="mt-2">
                    <p className="text-[var(--color-text-primary)] font-bold text-[17px]">{product.priceDisplay[language]}</p>
                    {product.priceSubDisplay && <p className="text-sm text-[var(--color-text-secondary)]">{product.priceSubDisplay[language]}</p>}
                </div>
            </div>
        </button>
    );
};

const SkeletonCard = () => (
    <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden ios-shadow border border-transparent animate-pulse flex flex-col">
        <div className="w-full h-48 bg-[var(--color-secondary-accent)]"></div>
        <div className="p-4 flex flex-col flex-grow">
            <div className="h-4 bg-[var(--color-secondary-accent)] rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-[var(--color-secondary-accent)] rounded w-1/2 mb-4"></div>
            <div className="flex-grow"></div>
            <div className="h-5 bg-[var(--color-secondary-accent)] rounded w-1/3 mt-2"></div>
        </div>
    </div>
);

interface MarketplaceProps {
    onSelectProduct: (product: Product) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onSelectProduct }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { language, t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getProducts();
            setProducts(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(product =>
            product.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.artisan[language].toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, products, language]);

    return (
        <div className="h-full w-full flex flex-col p-6 bg-[var(--color-bg)] overflow-y-auto">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('marketplaceTitle')}</h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">{t('marketplaceDesc')}</p>
            </header>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder={t('marketplaceSearchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-24">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onSelect={() => onSelectProduct(product)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Marketplace;
