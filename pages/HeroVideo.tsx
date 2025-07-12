import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = "/athervideo.m3u8";
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("/athervideo.m3u8");
        hls.attachMedia(video);
      }
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
    />
  );
} 