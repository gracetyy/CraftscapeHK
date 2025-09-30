import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Play: React.FC = () => {
    const { language } = useLanguage();
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS devices
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) ||
            (userAgent.includes('macintosh') && navigator.maxTouchPoints > 1);
        setIsIOS(isIOSDevice);
    }, []);

    const handleDownloadUSDZ = () => {
        // Create a temporary link to download the USDZ file
        const link = document.createElement('a');
        link.href = '/Chinese_knotting.usdz';
        link.download = 'Chinese_knotting.usdz';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePlayNowIOS = () => {
        // For iOS devices, open USDZ file directly with Quick Look
        const link = document.createElement('a');
        link.href = '/Chinese_knotting.usdz';
        link.rel = 'ar';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="h-full w-full flex flex-col bg-[var(--color-page-bg)] text-[var(--color-text-primary)] overflow-y-auto">
            <header className="p-6 pb-2 sticky top-0 bg-[var(--color-page-bg)]/80 backdrop-blur-md z-10">
                <h1 className="text-2xl font-bold text-[var(--color-primary-accent)] mb-1">
                    {language === 'zh' ? '遊玩 (AR)' : 'Play (AR)'}
                </h1>
                <p className="text-[17px] text-[var(--color-text-secondary)]">
                    {language === 'zh' ? '中國結 AR 體驗' : 'Chinese Knot AR Experience'}
                </p>
            </header>

            <div className="flex-grow p-6">
                {/* Simplified AR Model Card */}
                <div className="w-full rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg overflow-hidden">
                    <div className="p-6 text-center">
                        <div className="w-20 h-20 bg-[var(--color-page-bg)] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[var(--color-border)] overflow-hidden">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0756/3486/8539/files/O1CN01ve66dU1GNQU2kvm1A__2216587900610-0-cib_480x480.jpg?v=1705579996"
                                alt="Chinese Knot"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-[var(--color-primary-accent)] mb-2">
                            {language === 'zh' ? '中國結' : 'Chinese Knot'}
                        </h2>

                        <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                            {isIOS ? (
                                language === 'zh'
                                    ? '點擊「立即遊玩」使用 Quick Look 體驗 AR，或下載檔案供稍後使用'
                                    : 'Tap "Play now!" to experience AR with Quick Look, or download for later use'
                            ) : (
                                language === 'zh'
                                    ? '下載 3D 模型檔案以體驗 AR'
                                    : 'Download 3D model file for AR experience'
                            )}
                        </p>

                        {/* iOS Quick Look Play Button or Download Button */}
                        {isIOS ? (
                            <div className="space-y-3">
                                <button
                                    onClick={handlePlayNowIOS}
                                    className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7C3AED] hover:to-[#9333EA] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 relative flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    <div className="absolute left-5 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-center font-semibold">
                                        {language === 'zh' ? '立即遊玩！' : 'Play now!'}
                                    </span>
                                </button>
                                <button
                                    onClick={handleDownloadUSDZ}
                                    className="w-full bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 relative flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                                >
                                    <div className="absolute left-5 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-center font-semibold">
                                        {language === 'zh' ? '下載 AR 模型' : 'Download AR Model'}
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleDownloadUSDZ}
                                className="w-full bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 relative flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            >
                                <div className="absolute left-5 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-center font-semibold">
                                    {language === 'zh' ? '下載 AR 模型' : 'Download AR Model'}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Play;


