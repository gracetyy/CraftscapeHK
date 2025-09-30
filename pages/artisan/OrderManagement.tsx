import React, { useState, useEffect } from 'react';
import { getOrders } from '../../services/apiService';
import type { Order, OrderStatus } from '../../types';
import Spinner from '../../components/Spinner';
import { useLanguage } from '../../contexts/LanguageContext';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case '待處理': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
        case '已發貨': return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
        case '已完成': return 'bg-green-500/20 text-green-700 dark:text-green-500';
        case '已取消': return 'bg-red-500/20 text-red-700 dark:text-red-500';
        default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const { language, t } = useLanguage();
    return (
        <div className="bg-[var(--color-surface)] p-3 rounded-xl border border-[var(--color-border)] ios-shadow">
            <div className="flex items-center justify-between gap-3">
                {/* Product Image - smaller */}
                <img src={order.product.image} alt={order.product.name[language]} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                
                {/* Order Info - condensed */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-sm text-[var(--color-text-primary)] truncate">{order.customerName}</p>
                        <div className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${getStatusColor(order.status)}`}>
                            {order.status}
                        </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate">{order.product.name[language]}</p>
                    <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-[var(--color-text-secondary)]">#{order.id} • {t('artisanOrdersQuantity', { quantity: order.quantity })}</span>
                        <span className="font-bold text-[var(--color-text-primary)]">{t('artisanOrdersTotal', { total: order.total })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getOrders();
            setOrders(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto">
            <header className="p-6 pt-10">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('artisanOrdersTitle')}</h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">{t('artisanOrdersDesc')}</p>
            </header>

            <div className="flex-grow p-6 space-y-2 pb-24">
                {isLoading ? <Spinner text={t('spinnerOrders')} /> : (
                    orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
