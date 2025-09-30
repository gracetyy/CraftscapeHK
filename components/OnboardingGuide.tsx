import React, { ReactNode, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface OnboardingGuideProps {
  onClose: () => void;
}

const motifConfigs = [
  {
    viewBox: '0 0 480 180',
    path: 'M0 120 Q120 40 240 120 T480 120',
    className: 'absolute w-[155%] h-[145%] -top-32 -left-24 opacity-25',
    duration: 22,
  },
  {
    viewBox: '0 0 560 160',
    path: 'M0 60 Q140 140 280 60 T560 60',
    className: 'absolute w-[175%] h-[150%] -bottom-40 -right-36 opacity-20',
    duration: 26,
  },
  {
    viewBox: '0 0 320 320',
    path: 'M160 20 Q220 100 160 180 T160 340',
    className: 'absolute w-[75%] h-[75%] top-1/3 right-10 opacity-18',
    duration: 24,
  },
];

const floatingOrbs = [
  { top: '12%', left: '8%', size: 18, delay: 0 },
  { top: '68%', left: '12%', size: 14, delay: 0.6 },
  { top: '26%', right: '16%', size: 20, delay: 1.2 },
  { bottom: '22%', right: '8%', size: 16, delay: 1.8 },
];

const DoodleLayer: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    {motifConfigs.map((motif, index) => (
      <motion.svg
        key={`${motif.path}-${index}`}
        viewBox={motif.viewBox}
        className={motif.className}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.18, 0.4, 0.22] }}
        transition={{ duration: 10 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 1.2 }}
      >
        <motion.path
          d={motif.path}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray="18 22"
          animate={{ strokeDashoffset: [0, -160] }}
        transition={{ duration: motif.duration, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  ))}
    <motion.div
      className="absolute inset-x-10 top-10 h-36 rounded-full bg-white/12 blur-3xl"
      initial={{ opacity: 0.18 }}
      animate={{ opacity: [0.12, 0.3, 0.16] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-20 left-10 w-20 h-20 rounded-full border border-white/25"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.06, 0.94] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    {floatingOrbs.map((orb, index) => (
      <motion.span
        key={`orb-${index}`}
        className="absolute rounded-full bg-white/20 blur-xl"
        style={{
          top: orb.top,
          left: orb.left,
          right: orb.right,
          bottom: orb.bottom,
          width: orb.size,
          height: orb.size,
        }}
        initial={{ opacity: 0.18, scale: 0.9 }}
        animate={{ opacity: [0.15, 0.5, 0.2], scale: [0.9, 1.15, 0.95] }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
      />
    ))}
  </div>
);

const IconShell: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-[38%] border border-white/25 bg-white/5 backdrop-blur-md"
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 210, damping: 22 }}
  >
    <motion.div
      className="absolute inset-4 rounded-[32%] border border-white/18"
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-0 rounded-[38%] bg-white/8 blur-2xl"
      animate={{ opacity: [0.2, 0.35, 0.18] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="relative z-10 text-white">{children}</div>
  </motion.div>
);

const SwipeHandIcon = () => (
  <IconShell>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-12 h-12 sm:w-16 sm:h-16"
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.g
        animate={{ x: [-3.2, 3.2, -3.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        />
      </motion.g>
    </motion.svg>
  </IconShell>
);

const MarketplaceIcon = () => (
  <IconShell>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-28 h-28"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
    >
      <motion.path
        d="M20 18 L24 12 H40 L44 18"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M16 28 H48"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M16 28 L20 48 H44 L48 28"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ scaleY: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M24 34 H40"
        strokeLinecap="round"
        animate={{ pathLength: [0.2, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="24" cy="50" r="3.2" />
      <motion.circle cx="40" cy="50" r="3.2" />
    </motion.svg>
  </IconShell>
);

const EventsIcon = () => (
  <IconShell>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="w-28 h-28"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
    >
      <motion.rect
        x="15"
        y="16"
        width="34"
        height="30"
        rx="6"
        animate={{ scale: [1, 1.02, 1], y: [0, -1, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path d="M15 24 H49" strokeLinecap="round" />
      <motion.circle
        cx="32"
        cy="34"
        r="5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
      <motion.path
        d="M22 10 V18"
        strokeLinecap="round"
        animate={{ y: [0, 1.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M42 10 V18"
        strokeLinecap="round"
        animate={{ y: [0, 1.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.path
        d="M26 42 H38"
        strokeLinecap="round"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </motion.svg>
  </IconShell>
);

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const { t, language } = useLanguage();

  const slides = useMemo(
    () => [
      {
        key: 'explore',
        icon: <SwipeHandIcon />,
        title: t('onboardingTitle1'),
        description: t('onboardingDesc1'),
      },
      {
        key: 'market',
        icon: <MarketplaceIcon />,
        title: t('onboardingTitle2'),
        description: t('onboardingDesc2'),
      },
      {
        key: 'events',
        icon: <EventsIcon />,
        title: t('onboardingTitle3'),
        description: t('onboardingDesc3'),
      },
    ],
    [t]
  );

  const isLastStep = step === slides.length - 1;
  const backLabel = language === 'zh' ? '返回' : 'Back';

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      return;
    }
    setStep(previous => Math.min(previous + 1, slides.length - 1));
  };

  const handleBack = () => {
    setStep(previous => Math.max(previous - 1, 0));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[var(--color-primary-accent)] text-white overflow-hidden"
    >
      <DoodleLayer />
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white/75 hover:text-white transition-colors duration-300 z-30 focus:outline-none"
        aria-label="Close onboarding"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7"
          initial={{ rotate: -12, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          stroke="currentColor"
          strokeWidth={1.5}
          fill="none"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6 18 18M6 18 18 6" />
        </motion.svg>
      </button>

      <div className="relative flex-1 flex flex-col justify-between px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-24">
        <div className="flex-1 flex flex-col items-center justify-center gap-9 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[step].key}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -36 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-8 sm:gap-10"
            >
              {slides[step].icon}
              <div className="max-w-md space-y-4 px-2">
                <motion.h2
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  {slides[step].title}
                </motion.h2>
                <motion.p
                  className="text-base sm:text-lg text-white/85 leading-relaxed"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {slides[step].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-sm mx-auto space-y-7 mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-2">
            {slides.map((slide, index) => (
              <motion.span
                key={slide.key}
                className="h-2 rounded-full bg-white/35"
                initial={{ opacity: 0.5 }}
                animate={{
                  width: index === step ? 40 : 12,
                  opacity: index === step ? 1 : 0.45,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <motion.button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="flex-1 h-12 rounded-full border border-white/35 text-sm font-semibold text-white/85 hover:text-white hover:border-white/60 disabled:opacity-40 disabled:hover:border-white/35 disabled:hover:text-white/85 transition"
              whileTap={{ scale: 0.97 }}
            >
              {backLabel}
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNext}
              className="flex-[1.4] h-12 rounded-full bg-white text-[var(--color-primary-accent)] font-semibold tracking-wide shadow-lg shadow-black/10 hover:shadow-xl transition"
              whileTap={{ scale: 0.97 }}
            >
              {isLastStep ? t('onboardingStart') : t('onboardingNext')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingGuide;
