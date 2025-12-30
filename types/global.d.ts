export {};

declare global {
  interface Window {
    amplitude?: {
      track?: (eventName: string, eventProperties?: Record<string, unknown>) => void;
    };
  }
}
