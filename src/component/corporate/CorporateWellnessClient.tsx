'use client';

import { useEffect, useRef } from 'react';

export default function CorporateWellnessClient({ children }: { children: React.ReactNode }) {
  const hasScrolled = useRef(false);

  useEffect(() => {
    // Check if the URL contains 'corporate-contact' either as hash or query param
    const shouldScrollToContact = () => {
      if (typeof window === 'undefined') return false;
      const hash = window.location.hash;
      const search = window.location.search;
      const href = window.location.href;
      return (
        hash === '#corporate-contact' ||
        search.includes('corporate-contact') ||
        href.includes('corporate-contact')
      );
    };

    if (shouldScrollToContact() && !hasScrolled.current) {
      hasScrolled.current = true;
      // Wait for DOM to be fully rendered
      setTimeout(() => {
        const element = document.getElementById('corporate-contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return <>{children}</>;
}