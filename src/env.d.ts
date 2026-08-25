interface Window {
  theme?: {
    themeValue: string;
    setPreference: () => void;
    reflectPreference: () => void;
    getTheme: () => string;
    setTheme: (val: string) => void;
  };
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __gaAfterSwapBound?: boolean;
}
