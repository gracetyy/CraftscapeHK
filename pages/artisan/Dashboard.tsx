import React, { useState, useEffect, useMemo } from 'react';
import { getOrders, getMessageThreads } from '../../services/apiService';
import { ArtisanTab } from '../../enums';
import type { Order, MessageThread } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    onClick?: () => void;
    isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, onClick, isLoading }) => {
    const cardContent = (
        <div className="bg-[var(--color-surface)] p-4 rounded-2xl flex items-center space-x-4 border border-[var(--color-border)] ios-shadow w-full h-full transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="bg-[var(--color-secondary-accent)] p-3 rounded-xl">
                {icon}
            </div>
            <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{title}</p>
                {isLoading ? (
                    <div className="h-6 bg-[var(--color-secondary-accent)] rounded w-20 mt-1 animate-pulse"></div>
                ) : (
                    <p className="text-xl font-bold text-[var(--color-text-primary)]">{value}</p>
                )}
            </div>
        </div>
    );

    return onClick ? <button onClick={onClick} className="text-left w-full h-full">{cardContent}</button> : cardContent;
};


const QuickActionButton: React.FC<{ label: string, onClick?: () => void }> = ({ label, onClick }) => (
    <button onClick={onClick} className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-center font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-[var(--color-secondary-accent)] text-[var(--color-primary-accent)]">
        {label}
    </button>
);

interface DashboardProps {
    setActiveTab: (tab: ArtisanTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [messages, setMessages] = useState<MessageThread[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [ordersData, messagesData] = await Promise.all([
                    getOrders(),
                    getMessageThreads()
                ]);
                setOrders(ordersData);
                setMessages(messagesData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const todaysOrders = orders.filter(o => o.date === todayStr && o.status !== '已取消').length;
        const monthlyRevenue = orders
            .filter(o => {
                const orderDate = new Date(o.date);
                return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear && o.status === '已完成';
            })
            .reduce((sum, o) => sum + o.total, 0);

        const unreadMessages = messages.filter(m => m.unread).length;

        const avgOrderValue = orders.length > 0
            ? (orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(2)
            : 0;
        
        return {
            todaysOrders,
            monthlyRevenue: `HK$ ${monthlyRevenue.toLocaleString()}`,
            unreadMessages,
            avgOrderValue: `HK$ ${avgOrderValue}`
        };

    }, [orders, messages]);


    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto">
            <header className="p-6 pt-10">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('artisanDashboardTitle')}</h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">{t('artisanDashboardWelcome')}</p>
            </header>

            <div className="flex-grow p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <StatCard 
                        title={t('artisanDashboardTodaysOrders')}
                        value={stats.todaysOrders} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                        onClick={() => setActiveTab(ArtisanTab.Orders)}
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title={t('artisanDashboardUnreadMessages')}
                        value={stats.unreadMessages}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                        onClick={() => setActiveTab(ArtisanTab.Messages)}
                        isLoading={isLoading}
                    />
                     <StatCard 
                        title={t('artisanDashboardMonthlyRevenue')}
                        value={stats.monthlyRevenue}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title={t('artisanDashboardAvgOrderValue')}
                        value={stats.avgOrderValue}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-primary-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                        isLoading={isLoading}
                    />
                </div>
                
                <div className="pt-6">
                     <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">{t('artisanDashboardQuickActions')}</h2>
                     <div className="space-y-3">
                        <QuickActionButton label={t('artisanDashboardAddProduct')} onClick={() => setActiveTab(ArtisanTab.Products)} />
                        <QuickActionButton label={t('artisanDashboardViewOrders')} onClick={() => setActiveTab(ArtisanTab.Orders)} />
                     </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
