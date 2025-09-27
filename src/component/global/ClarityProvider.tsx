'use client';

import { useEffect } from 'react';
import { initClarity } from '@/utils/clarity';

export default function ClarityProvider() {
  useEffect(() => {
    const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    if (clarityProjectId && clarityProjectId !== 'YOUR_CLARITY_PROJECT_ID_HERE') {
      initClarity(clarityProjectId);
    } else {
      console.warn('Microsoft Clarity: Project ID not configured. Please set NEXT_PUBLIC_CLARITY_PROJECT_ID in your .env file');
    }
  }, []);

  // This component doesn't render anything, it just initializes Clarity
  return null;
}