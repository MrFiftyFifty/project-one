'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowUp } from 'lucide-react';
import { clsx } from 'clsx';

interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

export const ScrollToTop = ({ showAfter = 300, className }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 z-50 transition-all duration-300 transform',
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-16 opacity-0 scale-95 pointer-events-none',
        className
      )}
    >
      <Button
        onClick={scrollToTop}
        variant="primary"
        size="md"
        className={clsx(
          'rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl',
          'bg-blue-600 hover:bg-blue-700',
          'border-2 border-white',
          'transition-all duration-200 hover:scale-110',
          'focus:ring-4 focus:ring-blue-200'
        )}
        aria-label="Прокрутить наверх"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};