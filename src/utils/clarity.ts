import clarity from '@microsoft/clarity';

/**
 * Initialize Microsoft Clarity with the provided project ID
 * @param projectId - Your Clarity project ID from the dashboard
 */
export const initClarity = (projectId: string) => {
  if (typeof window !== 'undefined' && projectId) {
    clarity.init(projectId);
    console.log('Microsoft Clarity initialized with project ID:', projectId);
  }
};

/**
 * Set custom tags in Clarity for better analytics
 * @param key - Tag key
 * @param value - Tag value
 */
export const setClarityCustomTag = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    clarity.setTag(key, value);
  }
};

/**
 * Identify a user in Clarity for user session tracking
 * @param userId - Unique user identifier
 * @param userDetails - Optional user details object
 */
export const identifyClarityUser = (userId: string, userDetails?: {
  role?: 'user' | 'therapist' | 'admin';
  email?: string;
  name?: string;
}) => {
  if (typeof window !== 'undefined' && userId) {
    clarity.identify(userId);
    
    // Set additional custom tags if provided
    if (userDetails?.role) {
      setClarityCustomTag('userRole', userDetails.role);
    }
    if (userDetails?.email) {
      setClarityCustomTag('userEmail', userDetails.email);
    }
    if (userDetails?.name) {
      setClarityCustomTag('userName', userDetails.name);
    }
  }
};

/**
 * Track custom events in Clarity
 * @param eventName - Name of the event
 * @param properties - Additional properties for the event
 */
export const trackClarityEvent = (eventName: string, properties?: Record<string, string>) => {
  if (typeof window !== 'undefined') {
    // Set event as a custom tag
    setClarityCustomTag(`event_${eventName}`, 'true');
    
    // Set additional properties as tags
    if (properties) {
      Object.entries(properties).forEach(([key, value]) => {
        setClarityCustomTag(`${eventName}_${key}`, value);
      });
    }
  }
};

/**
 * Track appointment-related events
 */
export const trackAppointmentEvent = (
  action: 'book' | 'reschedule' | 'cancel' | 'complete',
  appointmentId?: string,
  therapistId?: string
) => {
  trackClarityEvent(`appointment_${action}`, {
    ...(appointmentId && { appointmentId }),
    ...(therapistId && { therapistId }),
    timestamp: new Date().toISOString()
  });
};

/**
 * Track user navigation events
 */
export const trackPageView = (pageName: string, additionalData?: Record<string, string>) => {
  trackClarityEvent('page_view', {
    page: pageName,
    ...additionalData
  });
};