import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // iOS-specific autoplay handling
      const playVideo = async () => {
        try {
          if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = "/athervideo.m3u8";
            await video.play();
          } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource("/athervideo.m3u8");
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, async () => {
              try {
                await video.play();
              } catch (error) {
                console.log("Autoplay failed, user interaction required");
              }
            });
          }
        } catch (error) {
          console.log("Autoplay failed, user interaction required");
        }
      };

      // Try to play immediately
      playVideo();

      // Also try on user interaction for iOS
      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      };

      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('click', handleUserInteraction, { once: true });

      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-auto object-cover"
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      webkit-playsinline="true"
      x5-playsinline="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
    />
  );
} 