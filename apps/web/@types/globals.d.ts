// src/globals.d.ts
export {}; // This makes the file a module

declare global {
  interface Window {
    YT: typeof YT; // This will be populated by @types/youtube
    onYouTubeIframeAPIReady?: () => void;
  }
}
