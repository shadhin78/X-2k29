'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Clock, Timer, Award, Hourglass, Calendar } from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  examSubject?: string;
  examCountdownText?: string;
  successScore?: string;
  timeElapsed?: string;
  daysRemaining?: string;
}

export function Header({
  onToggleMobileSidebar,
  examSubject = 'Exam',
  examCountdownText = '00d 00h 00m 00s',
  successScore = '0%',
  timeElapsed = '0d',
  daysRemaining = '0d',
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            id="mobile-sidebar-toggle"
            data-sidebar-toggle
            onClick={onToggleMobileSidebar}
            className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-xl transition-all active:scale-90 shadow-sm shrink-0"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex flex-col min-w-0">
            <div
              id="header-exam-countdown-compact-mobile"
              data-switch-page="exam"
              className="flex items-center cursor-pointer active:scale-95 transition-all"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/20 dark:border-rose-500/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span id="hdr-exam-cd-subject-mobile" className="text-rose-600 dark:text-rose-400 font-extrabold truncate max-w-[100px]">
                  {examSubject}
                </span>
                <span className="text-slate-300 dark:text-slate-600 font-black">•</span>
                <span id="hdr-exam-cd-timer-mobile" className="font-countdown font-bold text-slate-800 dark:text-slate-100 tracking-tight tabular-nums">
                  {examCountdownText.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <div id="mobile-header-clock" className="text-xs font-mono font-bold text-slate-400">
            {currentTime}
          </div>
        </div>
      </div>

      {/* Desktop Top Header Bar */}
      <header className="hidden md:flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 lg:gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 shrink-0 select-none">
        {/* Exam Countdown Widget Container */}
        <div
          id="header-exam-countdown-compact"
          className="flex items-center bg-white dark:bg-slate-800/80 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 h-[64px] min-h-[64px] shrink-0 justify-center md:justify-start hover:border-rose-300 dark:hover:border-rose-800/60 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center space-x-3 md:space-x-3.5">
            <div className="p-2 md:p-2.5 bg-gradient-to-br from-rose-50 to-rose-100/60 dark:from-rose-950/50 dark:to-rose-900/30 rounded-xl md:rounded-2xl border border-rose-200/70 dark:border-rose-800/50 shadow-[0_0_15px_rgba(244,63,94,0.15)] text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5 md:w-5.5 md:h-5.5 text-rose-600 dark:text-rose-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 md:gap-2.5 leading-none">
              <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              </span>
              <span
                id="hdr-exam-cd-subject"
                className="font-outfit font-black text-lg sm:text-xl md:text-2xl lg:text-[25px] text-slate-800 dark:text-slate-100 tracking-tight truncate max-w-[140px] lg:max-w-[210px] leading-none"
              >
                {examSubject}
              </span>
              <span className="text-slate-300 dark:text-slate-600 font-black text-lg md:text-2xl select-none px-0.5 leading-none">
                -
              </span>
              <div id="hdr-exam-cd-timer" className="font-countdown flex items-baseline leading-none text-base md:text-xl font-black text-white">
                {examCountdownText}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Widgets */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 md:flex md:flex-row md:items-center md:divide-x-0 bg-white dark:bg-slate-800/80 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 w-full lg:w-auto justify-center min-h-[64px]">
          {/* Header Clock */}
          <div id="header-clock-stats" className="hidden md:block pr-3 sm:pr-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Success Score */}
          <div
            id="success-score-stats"
            className="border-l-0 md:border-l border-slate-200 dark:border-slate-700 pl-2 sm:pl-3 md:pl-5 pr-2 sm:pr-3 md:pr-5"
          >
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase font-black tracking-wider text-slate-400">Success</span>
                <span className="text-xs sm:text-sm font-black text-slate-100">{successScore}</span>
              </div>
            </div>
          </div>

          {/* Time Elapsed */}
          <div
            id="time-gone-stats"
            className="border-l-0 md:border-l border-slate-200 dark:border-slate-700 pl-2 sm:pl-3 md:pl-5 pr-2 sm:pr-3 md:pr-5"
          >
            <div className="flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase font-black tracking-wider text-slate-400">Elapsed</span>
                <span className="text-xs sm:text-sm font-black text-slate-100">{timeElapsed}</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div
            id="countdown-timer"
            className="border-l-0 md:border-l border-slate-200 dark:border-slate-700 pl-2 sm:pl-3 md:pl-5 text-center md:text-right"
          >
            <div className="flex items-center gap-1.5 justify-end">
              <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div>
                <span className="block text-[9px] uppercase font-black tracking-wider text-slate-400">Days Left</span>
                <span className="text-xs sm:text-sm font-black text-slate-100">{daysRemaining}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
