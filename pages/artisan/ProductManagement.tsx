import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/apiService';
import { Product } from '../../types';
import Spinner from '../../components/Spinner';
import { useLanguage } from '../../contexts/LanguageContext';

const ARTISAN_NAME = "張師傅"; // Hardcoded for this demo

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { language, t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getProducts();
            const artisanProducts = data.filter(p => p.artisan.zh === ARTISAN_NAME);
            setProducts(artisanProducts);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto">
            <header className="p-6 pt-10 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('artisanProductsTitle')}</h1>
                    <p className="text-[17px] text-[var(--color-text-secondary)]">{t('artisanProductsDesc')}</p>
                </div>
                <button 
                    onClick={() => alert('Trigger add product flow!')}
                    className="bg-[var(--color-primary-accent)] text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </header>

            <div className="flex-grow p-6 space-y-4 pb-24">
                {isLoading ? <Spinner text={t('spinnerProducts')} /> : (
                    products.map(product => (
                        <div key={product.id} className="bg-[var(--color-surface)] p-3 rounded-2xl flex items-center space-x-4 border border-[var(--color-border)] ios-shadow">
                            <img src={product.image} alt={product.name[language]} className="w-20 h-20 object-cover rounded-xl" />
                            <div className="flex-grow">
                                <h3 className="font-semibold text-[var(--color-text-primary)]">{product.name[language]}</h3>
                                <p className="text-sm text-[var(--color-text-secondary)]">{product.priceDisplay[language]}</p>
                            </div>
                            <button className="text-sm font-semibold text-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/10 px-4 py-2 rounded-full">
                                {t('artisanProductsEdit')}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
