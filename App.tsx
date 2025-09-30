import React, { useState, useCallback, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import ArtisanBottomNav from './components/ArtisanBottomNav';
import Explore from './pages/Explore';
import Marketplace from './pages/Marketplace';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Play from './pages/Play';
import CraftDetail from './views/CraftDetail';
import AiStudio from './views/AiStudio';
import EventDetail from './views/EventDetail';
import ProductDetail from './views/ProductDetail';
import Chatroom from './views/Chatroom';
import TextLabOriginal from './text_lab/TextLabOriginal.tsx';
import { Tab, View, ArtisanTab, ArtisanView } from './enums';
import type { Craft, Event, Product, MessageThread } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { PRODUCTS } from './constants';
import OnboardingGuide from './components/OnboardingGuide';
import { useLanguage } from './contexts/LanguageContext';

// Artisan Pages
import Dashboard from './pages/artisan/Dashboard';
import ProductManagement from './pages/artisan/ProductManagement';
import OrderManagement from './pages/artisan/OrderManagement';
import ArtisanSettings from './pages/artisan/ArtisanSettings';
import Messages from './pages/artisan/Messages';
import ArtisanChatroom from './views/ArtisanChatroom';


export default function App() {
  const [isArtisanMode, setIsArtisanMode] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Explore);
  const [activeArtisanTab, setActiveArtisanTab] = useState<ArtisanTab>(ArtisanTab.Dashboard);

  // User view management
  const [currentView, setCurrentView] = useState<View>(View.Explore);
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Artisan view management
  const [currentArtisanView, setCurrentArtisanView] = useState<ArtisanView>(ArtisanView.List);
  const [selectedMessageThread, setSelectedMessageThread] = useState<MessageThread | null>(null);

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { language } = useLanguage();
  
  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = useCallback(() => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  }, []);

  const toggleArtisanMode = useCallback(() => {
    setIsArtisanMode(prev => {
        if (!prev) { 
            setActiveArtisanTab(ArtisanTab.Dashboard);
        } else {
            setActiveTab(Tab.Explore);
        }
        return !prev;
    });
  }, []);

  const handleCloseDetail = useCallback(() => {
    setCurrentView(View.Explore);
    setTimeout(() => {
        setSelectedCraft(null);
        setSelectedEvent(null);
        setSelectedProduct(null);
    }, 300);
  }, []);
  
  const handleShowCraftDetails = useCallback((craft: Craft) => {
    setSelectedCraft(craft);
    setCurrentView(View.CraftDetail);
  }, []);

  const handleShowEventDetails = useCallback((event: Event) => {
    setSelectedEvent(event);
    setCurrentView(View.EventDetail);
  }, []);

  const handleShowProductDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.ProductDetail);
  }, []);

  const handleStartCreation = useCallback(() => {
    if (selectedCraft) {
      setCurrentView(View.AiStudio);
    }
  }, [selectedCraft]);
  
  const handleOpenChatroom = useCallback(() => {
    if (selectedProduct) {
      setCurrentView(View.Chatroom);
    }
  }, [selectedProduct]);

  const handleCloseStudio = useCallback(() => setCurrentView(View.CraftDetail), []);
  const handleCloseProductDetail = useCallback(() => setCurrentView(View.Explore), []);
  const handleCloseChatroom = useCallback(() => setCurrentView(View.ProductDetail), []);

  const handleOpenTextLab = useCallback(() => {
    if (selectedProduct) {
      setCurrentView(View.TextLab);
    }
  }, [selectedProduct]);

  const handleOpenCraftTextLab = useCallback(() => {
    if (selectedCraft) {
      setCurrentView(View.TextLab);
    }
  }, [selectedCraft]);

  const handleCloseTextLab = useCallback(() => {
    if (selectedProduct) {
      setCurrentView(View.ProductDetail);
    } else if (selectedCraft) {
      setCurrentView(View.CraftDetail);
    }
  }, [selectedProduct, selectedCraft]);

  // Artisan view handlers
  const handleSelectMessageThread = useCallback((thread: MessageThread) => {
    setSelectedMessageThread(thread);
    setCurrentArtisanView(ArtisanView.Chatroom);
  }, []);

  const handleCloseArtisanChatroom = useCallback(() => {
    setCurrentArtisanView(ArtisanView.List);
    setTimeout(() => {
        setSelectedMessageThread(null);
    }, 300);
  }, []);
  
  const selectedThreadProduct = selectedMessageThread ? PRODUCTS.find(p => p.id === selectedMessageThread.productId) : null;

  const renderUserPage = () => {
    switch (activeTab) {
      case Tab.Explore:
        return <Explore onShowDetails={handleShowCraftDetails} />;
      case Tab.Marketplace:
        return <Marketplace onSelectProduct={handleShowProductDetails} />;
      case Tab.Events:
        return <Events onSelectEvent={handleShowEventDetails} />;
      case Tab.Play:
        return <Play />;
      case Tab.Profile:
        return <Profile onToggleArtisanMode={toggleArtisanMode} />;
      default:
        return <Explore onShowDetails={handleShowCraftDetails} />;
    }
  };
  
  const renderArtisanPage = () => {
      switch(activeArtisanTab) {
          case ArtisanTab.Dashboard:
              return <Dashboard setActiveTab={setActiveArtisanTab} />;
          case ArtisanTab.Products:
              return <ProductManagement />;
          case ArtisanTab.Orders:
              return <OrderManagement />;
          case ArtisanTab.Messages:
              return <Messages onSelectThread={handleSelectMessageThread} />;
          case ArtisanTab.Settings:
              return <ArtisanSettings onToggleArtisanMode={toggleArtisanMode} />;
          default:
              return <Dashboard setActiveTab={setActiveArtisanTab} />;
      }
  }

  const isExploreView = currentView === View.Explore;

  return (
    <div className="min-h-screen w-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans antialiased flex flex-col max-w-lg mx-auto ios-shadow border border-[var(--color-border)]">
      <AnimatePresence>
        {showOnboarding && <OnboardingGuide onClose={handleCloseOnboarding} />}
      </AnimatePresence>
      <main className="flex-grow relative">
        {isArtisanMode ? (
            <>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeArtisanTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {renderArtisanPage()}
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                    {currentArtisanView === ArtisanView.Chatroom && selectedMessageThread && selectedThreadProduct && (
                        <motion.div
                          key="artisan-chatroom"
                          className="absolute inset-0 z-30"
                          initial={{ y: '100%' }}
                          animate={{ y: 0 }}
                          exit={{ y: '100%' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <ArtisanChatroom 
                                thread={selectedMessageThread} 
                                product={selectedThreadProduct} 
                                onClose={handleCloseArtisanChatroom} 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        ) : (
          <>
            <div className={`transition-transform duration-300 pb-24 ${!isExploreView ? 'transform scale-95 opacity-50' : 'transform scale-100 opacity-100'}`}>
              {renderUserPage()}
            </div>

            {/* Fixed bottom chrome: BottomNav (with integrated center action) */}
            {(() => {
                const showPrimaryChrome = (
                  !isArtisanMode && isExploreView
                );
                if (!showPrimaryChrome) return null;
                return (
                  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-[60] pointer-events-none">
                    <div className="w-full pointer-events-auto">
                      <BottomNav activeTab={activeTab} setActiveTab={(tab) => {
                        if (activeTab !== tab || currentView !== View.Explore) {
                          setCurrentView(View.Explore);
                          setSelectedEvent(null);
                          setSelectedCraft(null);
                          setSelectedProduct(null);
                          setActiveTab(tab);
                        }
                      }} />
                    </div>
                  </div>
                );
            })()}

            <AnimatePresence>
              {currentView === View.CraftDetail && selectedCraft && (
                <motion.div
                  key="craft-detail"
                  className="absolute inset-0 z-20"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <CraftDetail
                    craft={selectedCraft}
                    onClose={handleCloseDetail}
                    onStartCreation={handleStartCreation}
                    onStartTextLab={handleOpenCraftTextLab}
                  />
                </motion.div>
              )}

              {currentView === View.EventDetail && selectedEvent && (
                <motion.div
                  key="event-detail"
                  className="absolute inset-0 z-20"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <EventDetail
                    event={selectedEvent}
                    onClose={handleCloseDetail}
                  />
                </motion.div>
              )}

              {currentView === View.ProductDetail && selectedProduct && (
                <motion.div
                  key="product-detail"
                  className="absolute inset-0 z-20"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <ProductDetail
                    product={selectedProduct}
                    onClose={handleCloseProductDetail}
                    onContact={handleOpenChatroom}
                    onAiGen={handleOpenTextLab}
                  />
                </motion.div>
              )}

              {currentView === View.AiStudio && selectedCraft && (
                <motion.div
                  key="ai-studio"
                  className="absolute inset-0 z-30"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <AiStudio craft={selectedCraft} onClose={handleCloseStudio} />
                </motion.div>
              )}

              {currentView === View.Chatroom && selectedProduct && (
                <motion.div
                  key="chatroom"
                  className="absolute inset-0 z-30"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Chatroom artisanName={selectedProduct.artisan[language]} onClose={handleCloseChatroom} />
                </motion.div>
              )}

              {currentView === View.TextLab && (selectedProduct || selectedCraft) && (
                <motion.div
                  key="text-lab"
                  className="absolute inset-0 z-30"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {selectedProduct ? (
                    <TextLabOriginal product={selectedProduct} onClose={handleCloseTextLab} />
                  ) : selectedCraft ? (
                    <TextLabOriginal craft={selectedCraft} onClose={handleCloseTextLab} />
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
        </>
        )}
      </main>

      {isArtisanMode ? (
        <ArtisanBottomNav activeTab={activeArtisanTab} setActiveTab={setActiveArtisanTab} />
      ) : null}
    </div>
  );
}
