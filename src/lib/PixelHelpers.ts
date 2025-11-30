
export const fbPageView = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq("track", "PageView");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fbLead = (params?: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq("track", "Lead", params || {});
  }
};

export const fbPurchase = (value: number, currency = "INR") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq("track", "Purchase", { value, currency });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fbCustomEvent = (eventName: string, params?: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).fbq) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq("trackCustom", eventName, params || {});
  }
};
