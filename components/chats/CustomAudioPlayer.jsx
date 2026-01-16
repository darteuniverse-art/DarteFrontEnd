"use client";

import React, { useState, useRef, useMemo } from "react";
import { Play, Pause } from "lucide-react";

export default function CustomAudioPlayer({ src, messageIsFromMe }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Generate random heights for the waveform visual
  const waveformBars = useMemo(() => {
    return Array.from(
      { length: 40 },
      () => Math.floor(Math.random() * 45) + 10
    );
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const current = audio.currentTime;
      const total = audio.duration;
      setCurrentTime(current);
      if (total > 0) setProgress((current / total) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Colors
  const filledColor = messageIsFromMe
    ? "bg-green-800 dark:bg-[#d9fdd3]"
    : "bg-slate-500 dark:bg-slate-400";

  const emptyColor = messageIsFromMe
    ? "bg-green-800/20 dark:bg-[#d9fdd3]/30"
    : "bg-slate-300 dark:bg-slate-600";

  return (
    <div className="flex flex-col w-full min-w-[240px] max-w-[320px] py-1 gap-1">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* --- ROW 1: CONTROLS & VISUALS (Perfectly Aligned) --- */}
      <div className="flex items-center gap-3 w-full">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors shrink-0 
            ${
              messageIsFromMe
                ? "bg-green-800/10 text-green-900 dark:bg-black/20 dark:text-[#d9fdd3]"
                : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            }`}
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" className="ml-1" />
          )}
        </button>

        {/* The Waveform Container */}
        <div className="relative h-8 flex-1 flex items-center">
          {/* A. Bars */}
          <div className="absolute inset-0 flex items-center justify-between gap-[2px] pointer-events-none z-0">
            {waveformBars.map((height, index) => {
              const barPercent = (index / waveformBars.length) * 100;
              const isFilled = barPercent < progress;
              return (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-colors duration-150 ${
                    isFilled ? filledColor : emptyColor
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>

          {/* B. Invisible Scrubber */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
      </div>

      {/* --- ROW 2: TIMERS (Indented below waveform) --- */}
      <div className="flex justify-between text-[11px] font-medium pl-12 pr-1">
        <span
          className={`${
            messageIsFromMe
              ? "text-green-900/70 dark:text-[#d9fdd3]/70"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {formatTime(currentTime)}
        </span>
        <span
          className={`${
            messageIsFromMe
              ? "text-green-900/70 dark:text-[#d9fdd3]/70"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
