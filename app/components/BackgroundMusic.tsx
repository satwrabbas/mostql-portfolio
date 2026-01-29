"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const [, setIsMusicActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/background-ambient.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    const playAudioOnInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsMusicActive(true);
            window.dispatchEvent(
              new CustomEvent("music-status", { detail: true }),
            );
            removeInteractionListeners();
          })
          .catch(() => {});
      }
    };

    const toggleAudioHandler = () => {
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setIsMusicActive(false);
          window.dispatchEvent(
            new CustomEvent("music-status", { detail: false }),
          );
        } else {
          audioRef.current.play();
          setIsMusicActive(true);
          window.dispatchEvent(
            new CustomEvent("music-status", { detail: true }),
          );
        }
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", playAudioOnInteraction);
      window.removeEventListener("scroll", playAudioOnInteraction);
      window.removeEventListener("touchstart", playAudioOnInteraction);
    };

    window.addEventListener("click", playAudioOnInteraction);
    window.addEventListener("scroll", playAudioOnInteraction);
    window.addEventListener("touchstart", playAudioOnInteraction);

    window.addEventListener("toggle-music", toggleAudioHandler);
    const reportStatus = () => {
      const active = audioRef.current ? !audioRef.current.paused : false;
      window.dispatchEvent(new CustomEvent("music-status", { detail: active }));
    };

    window.addEventListener("request-music-status", reportStatus);

    return () => {
      removeInteractionListeners();
      window.removeEventListener("toggle-music", toggleAudioHandler);
      window.removeEventListener("request-music-status", reportStatus);
    };
  }, []);

  return null;
}
