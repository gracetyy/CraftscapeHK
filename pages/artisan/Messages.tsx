import React, { useState, useEffect } from 'react';
import { getMessageThreads } from '../../services/apiService';
import type { MessageThread } from '../../types';
import Spinner from '../../components/Spinner';
import { useLanguage } from '../../contexts/LanguageContext';

const MessageThreadCard: React.FC<{ thread: MessageThread; onSelect: () => void; }> = ({ thread, onSelect }) => (
    <button onClick={onSelect} className="w-full bg-[var(--color-surface)] p-4 rounded-2xl flex items-center space-x-4 border border-[var(--color-border)] ios-shadow text-left transition-transform duration-200 ease-in-out hover:scale-[1.02]">
        <div className="relative flex-shrink-0">
            <img src={thread.avatar} alt={thread.customerName} className="w-14 h-14 object-cover rounded-full" />
            {thread.unread && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-[var(--color-primary-accent)] ring-2 ring-[var(--color-surface)]"></span>
            )}
        </div>
        <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-baseline">
                <h3 className={`font-bold text-[var(--color-text-primary)] truncate ${thread.unread ? 'font-extrabold' : 'font-semibold'}`}>{thread.customerName}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] flex-shrink-0 ml-2">{thread.timestamp}</p>
            </div>
            <p className={`text-sm text-[var(--color-text-secondary)] truncate ${thread.unread ? 'font-semibold text-[var(--color-text-primary)]' : ''}`}>
                {thread.lastMessage}
            </p>
        </div>
    </button>
);

interface MessagesProps {
    onSelectThread: (thread: MessageThread) => void;
}

const Messages: React.FC<MessagesProps> = ({ onSelectThread }) => {
    const [threads, setThreads] = useState<MessageThread[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getMessageThreads();
                setThreads(data);
            } catch (error) {
                console.error("Failed to fetch message threads:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const unreadCount = threads.filter(t => t.unread).length;

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto">
            <header className="p-6 pt-10">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('artisanMessagesTitle')}</h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">{t('artisanMessagesUnread', { count: unreadCount })}</p>
            </header>

            <div className="flex-grow p-6 space-y-3 pb-24">
                {isLoading ? <Spinner text={t('spinnerMessages')} /> : (
                    threads.map(thread => (
                        <MessageThreadCard key={thread.id} thread={thread} onSelect={() => onSelectThread(thread)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;
