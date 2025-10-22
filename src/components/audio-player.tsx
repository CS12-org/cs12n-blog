'use client';

import { useRef, useState, useEffect } from 'react';
import { Slider, SliderTrack, SliderThumb } from 'react-aria-components';
import Button from './button';
import { CiPause1 } from 'react-icons/ci';
import LicenceMark from './posts/license-mark';
import Comments from '../assets/images/comments.svg';
import Play from '@/assets/images/play-audio.svg';
import Save from '@/assets/images/save.svg';

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

    if (typeof newTime === 'number' && Number.isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handlePlay = () => {
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

    audioEl.addEventListener('loadedmetadata', onLoadedMetadata);
    audioEl.addEventListener('timeupdate', onTimeUpdate);
    audioEl.addEventListener('ended', onEnded);

    return () => {
      audioEl.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioEl.removeEventListener('timeupdate', onTimeUpdate);
      audioEl.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="flex w-full flex-col">
      <section className="bg-mantle flex items-center justify-between p-[10px] lg:px-[30px] lg:py-[10px]">
        <section className="flex gap-[10px]">
          <Button
            onClick={handlePlayPause}
            className="border-surface-0 bg-base flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border-[1px] lg:h-[48px] lg:w-[48px]"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <CiPause1 className="text-overlay-1 h-[20px] w-[20px] font-extrabold lg:h-[18px] lg:w-[20px]" />
            ) : (
              <Play className="text-overlay-1 h-[20px] w-[20px] font-extrabold lg:h-[24px] lg:w-[24px]" />
            )}
          </Button>
          <Button
            className="border-surface-0 bg-base flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border-[1px] lg:h-[48px] lg:w-[48px]"
            aria-label="Bookmark"
          >
            <Save className="text-overlay-1 h-[26px] w-[26px] fill-white font-extrabold lg:h-[24px] lg:w-[24px]" />
          </Button>
          <span className="text-sapphire self-center font-extrabold">|</span>{' '}
          <Button
            className="border-surface-0 bg-base flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1px] lg:h-[48px] lg:w-[48px]"
            aria-label="Comments"
          >
            <Comments className="text-overlay-1 h-[20px] w-[20px] font-extrabold lg:h-[29px] lg:w-[29px]" />
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
          className="bg-crust relative h-1 w-full"
        >
          <SliderTrack className="bg-base relative h-1 cursor-pointer overflow-hidden">
            <div
              className="bg-sapphire absolute top-0 left-0 h-[2px] transition-all duration-150 ease-linear"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </SliderTrack>
          <SliderThumb
            aria-label="Seek handle"
            className="bg-maroon top-1/2 block h-2 w-2 cursor-pointer rounded-full"
          />
        </Slider>
      </section>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </section>
  );
}
