import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full p-2 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme} // Animate when the key changes
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? (
            // Sun icon for dark mode (to switch to light)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[var(--color-text-secondary)]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={1.5} />
              <path d="M12 2V4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M12 20V22" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M4 12L2 12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M22 12L20 12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          ) : (
            // Moon icon for light mode (to switch to dark)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--color-text-secondary)]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
