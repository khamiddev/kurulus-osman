import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type YTPlayer = {
  unMute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allow: boolean) => void;
  setVolume: (v: number) => void;
  getPlayerState?: () => number;
};
type YTNamespace = { Player: new (el: HTMLElement, opts: unknown) => YTPlayer };
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const ENDED = 0;
const PLAYING = 1;
let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

/** Background music from YouTube; starts on the first user interaction. */
export function MusicButton({ videoId, suspended }: { videoId: string; suspended: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const ready = useRef(false);
  const wanted = useRef(true);
  const suspendedRef = useRef(suspended);
  const [playing, setPlaying] = useState(false);

  const tryPlay = useCallback(() => {
    const p = player.current;
    if (!p || !ready.current || !wanted.current || suspendedRef.current) return;
    p.unMute();
    p.playVideo();
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !host.current) return;
      player.current = new YT.Player(host.current, {
        videoId,
        width: 200,
        height: 120,
        playerVars: { autoplay: 1, controls: 0, loop: 1, playlist: videoId, playsinline: 1, rel: 0, modestbranding: 1, disablekb: 1 },
        events: {
          onReady: () => {
            ready.current = true;
            player.current?.setVolume(70);
            tryPlay();
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === ENDED) {
              player.current?.seekTo(0, true);
              player.current?.playVideo();
            }
            setPlaying(e.data === PLAYING);
          },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [videoId, tryPlay]);

  useEffect(() => {
    const onInteract = () => {
      if (player.current?.getPlayerState?.() !== PLAYING) tryPlay();
    };
    const events = ["pointerdown", "keydown", "touchend"] as const;
    events.forEach((ev) => window.addEventListener(ev, onInteract, { capture: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, onInteract, { capture: true }));
  }, [tryPlay]);

  useEffect(() => {
    suspendedRef.current = suspended;
    if (suspended) player.current?.pauseVideo();
    else tryPlay();
  }, [suspended, tryPlay]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0">
        <div ref={host} />
      </div>
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          if (playing) {
            wanted.current = false;
            player.current?.pauseVideo();
          } else {
            wanted.current = true;
            tryPlay();
          }
        }}
        aria-pressed={playing}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        className="flex items-center gap-2 whitespace-nowrap border border-gold/40 px-4 py-2 font-display text-xs tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        <span className="flex h-3 items-end gap-[2px]" aria-hidden>
          {[0, 0.2, 0.4].map((d) => (
            <span
              key={d}
              className={`block h-3 w-[2px] bg-current ${playing ? "eq-bar" : "scale-y-30"}`}
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </span>
        <span className="hidden sm:inline">Музыка</span>
      </button>
    </>
  );
}
