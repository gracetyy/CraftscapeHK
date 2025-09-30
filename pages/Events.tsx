

import React, { useState, useMemo, FC, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getEvents } from '../services/apiService';
import type { Event } from '../types';
import Spinner from '../components/Spinner';
import { useLanguage } from '../contexts/LanguageContext';

const dateFilters = ["dateAll", "dateToday", "dateTomorrow", "dateWeekend", "datePicker"];
const categoryFilters = ["categoryAll", "regionHK", "regionKLN", "regionNT", "typeWorkshop", "typeExhibition", "typeTalk"];

type CategoryFilterKey = typeof categoryFilters[number];
type DateFilterKey = typeof dateFilters[number];

const FilterButton: FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out flex-shrink-0 border ${
            isActive 
                ? 'bg-[var(--color-button-bg)] text-[var(--color-button-text)] border-transparent' 
                : 'bg-transparent border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-accent)]'
        }`}
    >
        {label}
    </button>
);

const EventCard: FC<{ event: Event; onSelect: () => void; className?: string; }> = ({ event, onSelect, className = '' }) => {
    const { language } = useLanguage();
    return (
        <button onClick={onSelect} className={`bg-[var(--color-surface)] rounded-2xl overflow-hidden ios-shadow border border-transparent hover:border-[var(--color-border)] transition-all duration-300 group text-left ${className}`}>
            <img src={event.image} alt={event.title[language]} className="w-full h-28 object-cover"/>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm text-[var(--color-text-primary)] leading-tight flex-grow">{event.title[language]}</h3>
                <div className="mt-1">
                    <p className="text-xs text-[var(--color-text-secondary)]">{event.date}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate">{event.location[language]}</p>
                </div>
            </div>
        </button>
    );
};

const FeaturedEventCard: FC<{ event: Event, onSelect: () => void }> = ({ event, onSelect }) => {
    const { language } = useLanguage();
    return (
        <button onClick={onSelect} className="w-[75vw] max-w-[280px] flex-shrink-0 bg-[var(--color-surface)] rounded-2xl overflow-hidden ios-shadow border border-transparent hover:border-[var(--color-border)] transition-all duration-300 group text-left">
            <div className="relative h-40">
                <img src={event.image} alt={event.title[language]} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{event.title[language]}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] truncate">{event.location[language]}</p>
            </div>
        </button>
    );
};

const CalendarModal: FC<{
    isOpen: boolean;
    onClose: () => void;
    onDateSelect: (date: Date) => void;
}> = ({ isOpen, onClose, onDateSelect }) => {
    const [displayDate, setDisplayDate] = useState(new Date(2025, 9, 1)); // Start at Oct 2025
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDateClick = (day: number) => {
        const selected = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
        onDateSelect(selected);
    };
    
    const changeMonth = (offset: number) => {
        setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[var(--color-surface)] rounded-2xl p-4 w-full max-w-sm ios-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-[var(--color-secondary-accent)]">&lt;</button>
                            <h3 className="font-bold text-lg">{`${displayDate.getFullYear()}年 ${displayDate.getMonth() + 1}月`}</h3>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-[var(--color-secondary-accent)]">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            {weekdays.map(day => <div key={day} className="font-semibold text-[var(--color-text-secondary)]">{day}</div>)}
                            {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
                            {days.map(day => (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className="p-2 rounded-full hover:bg-[var(--color-button-bg)] hover:text-[var(--color-button-text)]"
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


interface EventsProps {
    onSelectEvent: (event: Event) => void;
}

const Events: React.FC<EventsProps> = ({ onSelectEvent }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterKey>(dateFilters[0]);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("categoryAll");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(null);
    const { t } = useLanguage();

    const categoryTranslationMap = {
        '港島': 'regionHK', '九龍': 'regionKLN', '新界': 'regionNT', '線上': 'regionOnline',
        '工作坊': 'typeWorkshop', '展覽': 'typeExhibition', '講座': 'typeTalk',
    };
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getEvents();
            setEvents(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    
    const featuredEvents = useMemo(() => events.filter(e => e.isFeatured), [events]);

    const parseDate = (dateStr: string): Date => {
        const parts = dateStr.replace('年', '-').replace('月', '-').replace('日', '').split(/[-. ]/);
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    };

    const filteredUpcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const dayOfWeek = today.getDay();
        const saturdayOffset = 6 - dayOfWeek;
        const weekendStart = new Date(today);
        weekendStart.setDate(today.getDate() + saturdayOffset);

        const weekendEnd = new Date(weekendStart);
        weekendEnd.setDate(weekendStart.getDate() + 1);

        return events.filter(event => {
            const categoryMatch = selectedCategoryFilter === "categoryAll" || 
                categoryTranslationMap[event.region] === selectedCategoryFilter || 
                categoryTranslationMap[event.type] === selectedCategoryFilter;

            const dateMatch = (() => {
                if (selectedDateFilter === "dateAll") return true;
                
                const eventDateParsed = parseDate(event.date);
                if (isNaN(eventDateParsed.getTime())) return false;
                eventDateParsed.setHours(0, 0, 0, 0);

                switch (selectedDateFilter) {
                    case "dateToday":
                        return eventDateParsed.getTime() === today.getTime();
                    case "dateTomorrow":
                        return eventDateParsed.getTime() === tomorrow.getTime();
                    case "dateWeekend":
                        return eventDateParsed.getTime() >= weekendStart.getTime() && eventDateParsed.getTime() <= weekendEnd.getTime();
                    case "datePicker":
                        if (selectedCalendarDate) {
                            const calDate = new Date(selectedCalendarDate);
                            calDate.setHours(0, 0, 0, 0);
                            return eventDateParsed.getTime() === calDate.getTime();
                        }
                        return false; 
                    default:
                        return true;
                }
            })();

            return dateMatch && categoryMatch;
        });
    }, [selectedDateFilter, selectedCategoryFilter, selectedCalendarDate, events]);

    const handleDateFilterClick = (filter: DateFilterKey) => {
        if (filter === "datePicker") {
            setIsCalendarOpen(true);
        } else {
            setSelectedCalendarDate(null);
            setSelectedDateFilter(filter);
        }
    };
    
    const handleDateSelect = (date: Date) => {
        setSelectedCalendarDate(date);
        setSelectedDateFilter("datePicker");
        setIsCalendarOpen(false);
    };

    const datePickerLabel = selectedCalendarDate 
        ? `${selectedCalendarDate.getFullYear()}.${selectedCalendarDate.getMonth() + 1}.${selectedCalendarDate.getDate()}`
        : t('datePicker');
    
    if (isLoading) {
        return <Spinner text={t('spinnerEvents')} />;
    }

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-bg)] overflow-y-auto relative no-scrollbar">
            <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} onDateSelect={handleDateSelect} />

            <header className="p-6 pb-2 sticky top-0 bg-[var(--color-bg)]/80 backdrop-blur-md z-10">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{t('eventsTitle')}</h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">{t('eventsDesc')}</p>
            </header>

            <div className="px-6 py-4 space-y-6">
                 <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">{t('eventsTime')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {dateFilters.map(filter => (
                            <FilterButton 
                                key={filter} 
                                label={filter === "datePicker" ? datePickerLabel : t(filter as any)}
                                isActive={selectedDateFilter === filter}
                                onClick={() => handleDateFilterClick(filter as DateFilterKey)}
                            />
                        ))}
                    </div>
                </div>
                 <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">{t('eventsCategory')}</h3>
                    <div className="flex flex-nowrap space-x-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
                        {categoryFilters.map(filter => (
                            <FilterButton 
                                key={filter} 
                                label={t(filter as any)} 
                                isActive={selectedCategoryFilter === filter}
                                onClick={() => setSelectedCategoryFilter(filter)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <section className="mt-2 w-full">
                <div className="px-6 mb-2">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{t('eventsFeatured')}</h2>
                </div>
                <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 pl-6 snap-x snap-mandatory no-scrollbar" style={{ scrollPaddingLeft: '1.5rem' }}>
                    {featuredEvents.map(event => (
                        <div key={event.id} className="snap-start">
                             <FeaturedEventCard event={event} onSelect={() => onSelectEvent(event)} />
                        </div>
                    ))}
                     <div className="flex-shrink-0 w-2 h-1"></div>
                </div>
            </section>
            
            <section className="mt-6 px-6 flex-grow">
                 <div className="mb-2">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{t('eventsUpcoming')}</h2>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pb-24">
                    {filteredUpcomingEvents.length > 0 ? filteredUpcomingEvents.map(event => (
                        <EventCard key={event.id} event={event} onSelect={() => onSelectEvent(event)} />
                    )) : (
                        <p className="col-span-2 text-center text-[var(--color-text-secondary)] mt-8">No events match your criteria.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Events;

const style = document.createElement('style');
style.textContent = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.append(style);