import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from "lucide-react";

import { MUSIC_YOUTUBE_ID, SLIDES } from "@/lib/slides";
import { Embers } from "./Embers";
import { MusicButton } from "./MusicButton";
import { SlideContent } from "./SlideContent";

const trailerSlide = SLIDES.find((s) => s.kind === "trailer");
const TRAILER_ID = trailerSlide?.kind === "trailer" ? trailerSlide.trailerYoutubeId : "";
const pad = (n: number) => String(n).padStart(2, "0");

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const lastWheel = useRef(0);
  const touchX = useRef<number | null>(null);
  const total = SLIDES.length;

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(total - 1, i))), [total]);
  const next = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (trailerOpen) {
        if (e.key === "Escape") setTrailerOpen(false);
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(total - 1);
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, toggleFullscreen, trailerOpen]);

  return (
    <div
      ref={root}
      className="relative h-[100dvh] w-screen select-none overflow-hidden bg-ink"
      onWheel={(e) => {
        if (trailerOpen || Math.abs(e.deltaY) < 30) return;
        const now = Date.now();
        if (now - lastWheel.current < 1000) return;
        lastWheel.current = now;
        if (e.deltaY > 0) next();
        else prev();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        if (start != null && end != null) {
          if (start - end > 50) next();
          else if (end - start > 50) prev();
        }
        touchX.current = null;
      }}
    >
      <main>
        {SLIDES.map((slide, i) => (
          <section
            key={slide.id}
            className="slide-layer"
            data-active={i === index}
            aria-hidden={i !== index}
            aria-label={`${i + 1} / ${total}: ${slide.title}`}
          >
            <SlideContent slide={slide} active={i === index} onPlayTrailer={() => setTrailerOpen(true)} />
          </section>
        ))}
      </main>

      <Embers />
      <div aria-hidden className="film-grain pointer-events-none absolute inset-0" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-6 py-6 md:px-12">
        <button type="button" onClick={() => goTo(0)} className="flex items-center gap-3 text-gold">
          <span className="flex h-9 w-9 items-center justify-center border border-gold/60 font-display text-lg">O</span>
          <span className="hidden whitespace-nowrap font-display text-sm tracking-epic sm:inline">Kuruluş Osman</span>
        </button>
        <nav className="hidden items-center gap-5 2xl:flex" aria-label="Главы">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className={`whitespace-nowrap font-display text-xs tracking-[0.22em] transition-colors duration-500 ${
                i === index ? "text-gold-bright" : "text-parchment/45 hover:text-gold"
              }`}
            >
              {slide.nav}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <MusicButton videoId={MUSIC_YOUTUBE_ID} suspended={trailerOpen} />
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 whitespace-nowrap border border-gold/40 px-4 py-2 font-display text-xs tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span className="hidden sm:inline">{fullscreen ? "Выйти" : "На весь экран"}</span>
          </button>
        </div>
      </header>

      <footer className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 md:px-12 md:pb-8">
        <div className="flex items-end justify-between gap-6">
          <div className="font-display text-gold">
            <span className="text-5xl leading-none md:text-6xl">{pad(index + 1)}</span>
            <span className="ml-2 text-lg text-parchment/50">/ {pad(total)}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              aria-label="Назад"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:bg-gold hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index === total - 1}
              aria-label="Вперёд"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold transition-all hover:bg-gold hover:text-ink disabled:opacity-25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex gap-1.5">
          {SLIDES.map((slide, i) => (
            <button key={slide.id} type="button" onClick={() => goTo(i)} aria-label={slide.nav} className="group h-4 flex-1">
              <span className="block h-px w-full bg-parchment/20">
                <span
                  className="block h-px bg-gold transition-all duration-700"
                  style={{ width: i <= index ? "100%" : "0%" }}
                />
              </span>
            </button>
          ))}
        </div>
      </footer>

      {trailerOpen && (
        <div
          role="dialog"
          aria-label="Трейлер"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-md animate-in fade-in duration-500"
          onClick={() => setTrailerOpen(false)}
        >
          <button
            type="button"
            onClick={() => setTrailerOpen(false)}
            aria-label="Закрыть трейлер"
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
            <p className="mb-4 text-center font-display text-sm tracking-epic text-gold">Основание: Осман · Русский трейлер</p>
            <div className="border border-gold/40 p-2 shadow-glow">
              <iframe
                className="aspect-video w-full bg-ink"
                src={`https://www.youtube-nocookie.com/embed/${TRAILER_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Основание: Осман — русский трейлер"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
