"use client";
import React, { useCallback, useEffect, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  uniquePlayerIdSuffix: string; // Important for multiple players
}

// --- Module-level state to manage API loading ---
let isApiLoaded = false;
let apiPromise: Promise<void> | null = null;
const playerQueue: Array<() => void> = []; // Queue for players waiting for API

function ensureYouTubeApiReady(): Promise<void> {
  if (isApiLoaded && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (apiPromise) {
    return apiPromise;
  }

  apiPromise = new Promise<void>((resolve, reject) => {
    // Check if script tag already exists (e.g., from another instance)
    if (
      document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    ) {
      // If script tag exists but YT is not ready, means it's still loading
      // We rely on the global onYouTubeIframeAPIReady to be set by the first loader
      // This part might need refinement if script exists but YT is not ready yet.
      // The ideal is that only one instance ever *creates* the script tag.
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag); // Fallback if no script tags
      }
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousOnReady && typeof previousOnReady === "function") {
        previousOnReady(); // Call any previously defined ready function
      }
      isApiLoaded = true;
      resolve();
      // Process any queued players
      while (playerQueue.length) {
        const initFn = playerQueue.shift();
        if (initFn) initFn();
      }
    };

    // Timeout for API load failure
    setTimeout(() => {
      if (!isApiLoaded) {
        console.error("YouTube API failed to load within timeout.");
        reject(new Error("YouTube API load timeout"));
        apiPromise = null; // Reset promise so it can be tried again if needed
      }
    }, 10000); // 10 seconds timeout
  });

  return apiPromise;
}
// --- End Module-level state ---

export function YouTubePlayer({
  videoId,
  width = 768,
  height = 432,
  autoplay = false,
  uniquePlayerIdSuffix, // e.g., "player-1", "player-2"
}: YouTubePlayerProps) {
  // Each player instance needs a unique ID for the div element
  const playerId = `youtube-player-${uniquePlayerIdSuffix}`;
  const playerRef = useRef<HTMLDivElement | null>(null); // This ref is for the div itself
  const ytPlayerInstanceRef = useRef<YT.Player | null>(null); // To store the YT.Player object

  const initializePlayer = useCallback(() => {
    if (!document.getElementById(playerId) || !videoId) {
      // console.warn(`Player element with ID ${playerId} not found or no videoId for ${uniquePlayerIdSuffix}`);
      return;
    }
    if (ytPlayerInstanceRef.current) {
      ytPlayerInstanceRef.current.destroy(); // Destroy previous instance if videoId changes
      ytPlayerInstanceRef.current = null;
    }

    // console.log(`Initializing player: ${playerId} with video: ${videoId}`);
    try {
      ytPlayerInstanceRef.current = new window.YT.Player(playerId, {
        videoId,
        width: String(width),
        height: String(height),
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          modestbranding: 0,
          rel: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            // console.log(`Player ${playerId} Ready:`, event.target);
          },
          onError: (event: YT.OnErrorEvent) => {
            console.error(`YouTube Player Error (${playerId}):`, event.data);
          },
        },
      });
    } catch (error) {
      console.error(`Failed to create YT.Player for ${playerId}:`, error);
    }
  }, [playerId, videoId, width, height, autoplay, uniquePlayerIdSuffix]);

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = () => {
      if (isMounted) {
        initializePlayer();
      }
    };

    ensureYouTubeApiReady()
      .then(() => {
        if (isApiLoaded && window.YT && window.YT.Player) {
          setupPlayer();
        } else {
          // This case should ideally not happen if promise resolves correctly
          // but as a fallback, queue it.
          playerQueue.push(setupPlayer);
        }
      })
      .catch((error) => {
        console.error("Failed to ensure YouTube API readiness:", error);
      });

    return () => {
      isMounted = false;
      if (ytPlayerInstanceRef.current) {
        // console.log(`Destroying player: ${playerId}`);
        try {
          ytPlayerInstanceRef.current.destroy();
        } catch (e) {
          // console.warn(`Error destroying player ${playerId}:`, e);
          // Player might have already been destroyed or in an invalid state
        }
        ytPlayerInstanceRef.current = null;
      }
    };
  }, [initializePlayer]); // Re-run if initializePlayer changes (due to its deps changing)

  return (
    // The div that the YouTube player will replace needs a unique ID
    <div
      id={playerId}
      ref={playerRef}
      style={{
        width: "100%",
        height: String(height),
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Placeholder content or loading indicator can go here */}
    </div>
  );
}
