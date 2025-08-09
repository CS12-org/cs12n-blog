
"use client";

import { useRef, useState, useEffect } from "react";
import { Slider, SliderTrack, SliderThumb } from "react-aria-components";
import Button from "./button";
import { CiBookmark, CiPlay1, CiPause1 } from "react-icons/ci";
import { BiMessageAltDetail } from "react-icons/bi";
import LicenceMark from "./posts/license-mark";

export default function AudioPlayer({ audioSrc }: { audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };


const handleSeek = (value: number | number[]) => {
  if (!audioRef.current) return;


  const newTime = Array.isArray(value) ? value[0] : value;


  if (typeof newTime === "number" && Number.isFinite(newTime)) {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }
};  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audioEl = audioRef.current;

    const onLoadedMetadata = () => {
      setDuration(audioEl.duration);
    };
    const onTimeUpdate = () => {
      handleTimeUpdate();
    };
    const onEnded = () => {
      setIsPlaying(false);
    };

    audioEl.addEventListener("loadedmetadata", onLoadedMetadata);
    audioEl.addEventListener("timeupdate", onTimeUpdate);
    audioEl.addEventListener("ended", onEnded);

    return () => {
      audioEl.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
      audioEl.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="flex flex-col w-full ">
      <section className="flex justify-between items-center p-[10px] lg:px-[30px] bg-mantle lg:py-[10px]">
        <section className="flex gap-[10px]">
          <Button
            onClick={handlePlayPause}
            className="lg:h-[48px] lg:w-[48px] h-[30px] w-[30px] border-surface-0 border-[1px] bg-base rounded-[10px] flex justify-center items-center"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <CiPause1 className="text-overlay-1 lg:h-[18px] lg:w-[20px] h-[16px] w-[16px] font-extrabold" />
            ) : (
              <CiPlay1 className="text-overlay-1 lg:h-[18px] lg:w-[20px] h-[16px] w-[16px] font-extrabold" />
            )}
          </Button>

          <Button
            className="lg:h-[48px] lg:w-[48px] h-[30px] w-[30px] border-surface-0 border-[1px] bg-base rounded-[10px] flex justify-center items-center"
            aria-label="Bookmark"
          >
            <CiBookmark className="text-overlay-1 h-[16px] w-[18px] lg:h-[18px] lg:w-[20px] font-extrabold" />
          </Button>

          <span className="self-center text-sapphire font-extrabold">|</span>{" "}

          <Button
            className="lg:h-[48px] lg:w-[48px] h-[30px] w-[30px] border-surface-0 border-[1px] bg-base rounded-full flex justify-center items-center"
            aria-label="Comments"
          >
            <BiMessageAltDetail className="text-overlay-1 h-[16px] w-[18px] lg:h-[18px] lg:w-[20px] font-extrabold" />
          </Button>
        </section>
        <LicenceMark />
      </section>

      <section className=" ">
  
<Slider
  minValue={0}
  maxValue={duration || 0}
  value={currentTime}
  step={0.01}
  onChange={handleSeek}
  aria-label="Audio seek slider"
  className="w-full h-1 bg-crust relative"
>
  <SliderTrack className="bg-base h-1 cursor-pointer relative overflow-hidden">
 
    <div
      className="absolute left-0 top-0 h-1  bg-sapphire transition-all duration-150 ease-linear"
      style={{
        width: duration ? `${(currentTime / duration) * 100}%` : "0%",
      }}
    />
  </SliderTrack>
  <SliderThumb
    className="block w-0 h-0 bg-maroon rounded-full "
    aria-label="Seek handle"
  />
</Slider>
      </section>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </section>
  );
}

