import type { CSSProperties, ReactNode } from "react";
import { Play } from "lucide-react";

import type { Slide } from "@/lib/slides";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const SHELL = "relative z-10 flex h-full w-full flex-col justify-center px-6 pb-32 pt-24 md:px-20 lg:px-28";
const num = (i: number) => String(i + 1).padStart(2, "0");

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="reveal font-display text-sm tracking-epic text-gold md:text-base" style={delay(0.2)}>
        {children}
      </p>
      <div className="reveal-line bg-gold-line mt-4 h-px w-40 md:w-56" style={delay(0.35)} />
    </div>
  );
}

function Title({ children, size = "default" }: { children: ReactNode; size?: "xl" | "compact" | "default" }) {
  const sizes = {
    xl: "text-[clamp(3.2rem,9vw,9.5rem)]",
    compact: "text-[clamp(2.2rem,6vw,6rem)]",
    default: "text-[clamp(2.8rem,7vw,7rem)]",
  };
  return (
    <h2 className={`reveal font-display leading-[0.92] text-gold-gradient ${sizes[size]}`} style={delay(0.45)}>
      {children}
    </h2>
  );
}

function Backdrop({
  image,
  active,
  veil = "left",
  focus = "center",
}: {
  image: string;
  active: boolean;
  veil?: "left" | "center";
  focus?: "top" | "center" | undefined;
}) {
  return (
    <>
      <img
        src={image}
        alt=""
        aria-hidden
        loading={active ? "eager" : "lazy"}
        className={`ken-burns absolute inset-0 h-full w-full object-cover ${focus === "top" ? "origin-top object-top" : ""}`}
      />
      <div className={`absolute inset-0 ${veil === "left" ? "bg-veil-left max-md:bg-veil-full" : "bg-veil-full"}`} />
      <div className="absolute inset-0 bg-vignette" />
    </>
  );
}

function Facts({ facts, d }: { facts: string[]; d: number }) {
  return (
    <ul className="reveal mt-8 flex flex-wrap gap-3" style={delay(d)}>
      {facts.map((f) => (
        <li key={f} className="border border-gold/40 px-4 py-2 font-display text-sm tracking-[0.2em] text-gold">
          {f}
        </li>
      ))}
    </ul>
  );
}

export function SlideContent({
  slide,
  active,
  onPlayTrailer,
}: {
  slide: Slide;
  active: boolean;
  onPlayTrailer: () => void;
}) {
  switch (slide.kind) {
    case "trailer":
      return (
        <>
          {active ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.video}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={slide.poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-veil-left max-md:bg-veil-full" />
          <div className="absolute inset-0 bg-vignette" />
          <div className={SHELL}>
            <div className="max-w-4xl">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title size="xl">{slide.title}</Title>
              <p className="reveal mt-8 max-w-xl text-xl leading-relaxed text-parchment md:text-2xl" style={delay(0.7)}>
                {slide.lead}
              </p>
              <div className="reveal mt-10 flex items-center gap-5" style={delay(0.95)}>
                <button
                  type="button"
                  onClick={onPlayTrailer}
                  aria-label="Смотреть трейлер"
                  className="pulse-ring group flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-gold hover:text-ink"
                >
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </button>
                <div>
                  <p className="font-display text-lg tracking-[0.25em] text-gold">Смотреть трейлер</p>
                  <p className="text-sm text-muted-foreground">{slide.trailerLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    case "list":
      return (
        <>
          <Backdrop image={slide.image} active={active} focus={slide.focus} />
          <div className={SHELL}>
            <div className="max-w-3xl">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title>{slide.title}</Title>
              <ol className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2 md:gap-y-8">
                {slide.items.map((item, i) => (
                  <li key={item.title} className="reveal flex gap-4" style={delay(0.75 + i * 0.12)}>
                    <span className="font-display text-3xl leading-none text-gold-deep">{num(i)}</span>
                    <div className="border-l border-gold/40 pl-4">
                      <h3 className="font-display text-xl tracking-wider text-gold-bright md:text-2xl">{item.title}</h3>
                      <p className="mt-1 text-base leading-snug text-parchment/85 md:text-lg">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      );

    case "story":
      return (
        <>
          <Backdrop image={slide.image} active={active} />
          <div className="reveal absolute inset-y-0 right-0 w-full md:w-[52%]" style={delay(0.15)}>
            <img
              src={slide.photo}
              alt={slide.photoAlt}
              className="ken-burns mask-fade-left h-full w-full object-cover object-top max-md:opacity-45"
            />
            <div className="absolute inset-0 bg-veil-bottom opacity-70" />
          </div>
          <div className={SHELL}>
            <div className="max-w-3xl md:max-w-[46%]">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title>{slide.title}</Title>
              <p className="reveal mt-8 max-w-2xl text-xl leading-relaxed text-parchment md:text-2xl" style={delay(0.7)}>
                {slide.text}
              </p>
              <blockquote
                className="reveal mt-10 max-w-2xl border-l-2 border-gold pl-6 font-display text-2xl italic text-gold-bright md:text-4xl"
                style={delay(0.95)}
              >
                {slide.quote}
              </blockquote>
            </div>
          </div>
        </>
      );

    case "alps":
      return (
        <>
          <Backdrop image={slide.image} active={active} veil="center" />
          <div className={`${SHELL} justify-end md:justify-center`}>
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <Title>{slide.title}</Title>
            <ol className="mt-6 grid grid-cols-3 gap-2 md:mt-10 md:grid-cols-6 md:gap-4">
              {slide.items.map((item, i) => (
                <li
                  key={item.title}
                  className="reveal group overflow-hidden border border-gold/35 bg-ink shadow-glow"
                  style={delay(0.7 + i * 0.12)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden md:aspect-[3/4.4] md:max-h-[42vh] md:w-full">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="h-full w-full object-cover object-top transition-transform duration-[1.6s] group-hover:scale-110"
                    />
                    <span className="absolute left-2 top-2 font-display text-xl text-gold md:left-3 md:top-3 md:text-2xl">
                      {num(i)}
                    </span>
                  </div>
                  <div className="border-t border-gold/30 bg-ink/90 p-2 md:p-3 lg:p-4">
                    <h3 className="font-display text-sm tracking-wider text-gold-bright md:text-lg lg:text-xl">{item.title}</h3>
                    <p className="mt-1 hidden text-xs leading-snug text-parchment/85 md:block lg:text-sm">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      );

    case "heroine":
      return (
        <>
          <img
            src={slide.photo}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
          />
          {/* Phones have no room for the framed photo, so it becomes a sharp full-screen backdrop. */}
          <img
            src={slide.photo}
            alt="Озге Тёрер в роли Бала-хатун"
            className="ken-burns absolute inset-0 h-full w-full origin-top object-cover object-top md:hidden"
          />
          <div className="absolute inset-0 bg-veil-left max-md:bg-veil-full" />
          <div className="absolute inset-0 bg-vignette" />
          <div className={`${SHELL} max-md:justify-end md:flex-row md:items-center md:justify-between md:gap-16`}>
            <div className="max-w-2xl">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title>{slide.title}</Title>
              <p className="reveal mt-3 font-display text-2xl tracking-[0.3em] text-gold md:text-3xl" style={delay(0.6)}>
                {slide.subtitle}
              </p>
              <p className="reveal mt-4 text-base leading-relaxed text-parchment md:mt-6 md:text-2xl" style={delay(0.75)}>
                {slide.text}
              </p>
              <Facts facts={slide.facts} d={0.95} />
            </div>
            <div className="reveal relative hidden shrink-0 md:mr-10 md:block" style={delay(0.5)}>
              <div className="absolute -inset-4 border border-gold/40" />
              <div className="absolute -inset-8 border border-gold/15" />
              <div className="relative aspect-[736/920] h-[min(64vh,600px)] overflow-hidden shadow-glow">
                <img
                  src={slide.photo}
                  alt="Озге Тёрер в роли Бала-хатун"
                  className="ken-burns h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-veil-bottom opacity-50" />
              </div>
              <div
                className="reveal absolute -bottom-10 -left-20 aspect-[3/4] w-[min(13vw,190px)] overflow-hidden border-2 border-gold shadow-glow"
                style={delay(1.1)}
              >
                <img src={slide.photoSecondary} alt="Бала-хатун" className="h-full w-full object-cover object-top" />
              </div>
            </div>
          </div>
        </>
      );

    case "portrait":
      return (
        <>
          <img
            src={slide.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
          />
          {/* Phones have no room for the framed photo, so it becomes a sharp full-screen backdrop. */}
          <img
            src={slide.image}
            alt="Бурак Озчивит в роли Османа"
            className="ken-burns absolute inset-0 h-full w-full origin-top object-cover object-top md:hidden"
          />
          <div className="absolute inset-0 bg-veil-left max-md:bg-veil-full" />
          <div className="absolute inset-0 bg-vignette" />
          <div className={`${SHELL} max-md:justify-end md:flex-row md:items-center md:justify-between md:gap-16`}>
            <div className="max-w-2xl">
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <Title>{slide.title}</Title>
              <p className="reveal mt-4 text-base leading-relaxed text-parchment md:mt-8 md:text-2xl" style={delay(0.7)}>
                {slide.text}
              </p>
              <Facts facts={slide.facts} d={0.9} />
            </div>
            <div className="reveal relative hidden shrink-0 md:block" style={delay(0.6)}>
              <div className="absolute -inset-4 border border-gold/40" />
              <div className="absolute -inset-8 border border-gold/15" />
              <div className="relative aspect-[685/960] h-[min(68vh,640px)] overflow-hidden shadow-glow">
                <img src={slide.image} alt="Бурак Озчивит в роли Османа" className="ken-burns h-full w-full object-cover" />
                <div className="absolute inset-0 bg-veil-bottom opacity-60" />
              </div>
            </div>
          </div>
        </>
      );

    case "finale":
      return (
        <>
          <Backdrop image={slide.image} active={active} veil="center" />
          <div className={`${SHELL} items-center text-center`}>
            <p className="reveal font-display text-sm tracking-epic text-gold md:text-base" style={delay(0.2)}>
              {slide.eyebrow}
            </p>
            <div className="reveal-line bg-gold-line mx-auto mb-8 mt-4 h-px w-56" style={delay(0.35)} />
            <Title size="xl">{slide.title}</Title>
            <p className="reveal mt-8 max-w-2xl text-xl leading-relaxed text-parchment md:text-3xl" style={delay(0.8)}>
              {slide.text}
            </p>
          </div>
        </>
      );

    case "about":
      return (
        <>
          {/* Soft blurred copy fills the screen; the sharp still sits on the right, uncropped around Osman. */}
          <img
            src={slide.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
          />
          <div className="reveal mask-fade-left absolute inset-y-0 right-0 w-full md:w-[50%]" style={delay(0.15)}>
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="soft-zoom h-full w-full object-cover object-[75%_center] max-md:opacity-40"
            />
            <div className="absolute inset-0 bg-veil-bottom opacity-60" />
            <div className="absolute inset-0 bg-veil-top" />
          </div>
          <div className="absolute inset-0 bg-veil-left max-md:bg-veil-full" />
          <div className={`${SHELL} max-md:justify-end max-md:pb-28`}>
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <Title size="compact">{slide.title}</Title>
            <div className="mt-5 grid max-w-5xl gap-5 md:mt-8 md:grid-cols-[1fr_1.15fr] md:gap-10">
              <div className="reveal" style={delay(0.65)}>
                <h3 className="font-display text-base tracking-[0.25em] text-gold md:text-xl">{slide.storyTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment md:mt-3 md:text-xl">{slide.story}</p>
                <p className="mt-6 hidden border-l-2 border-gold pl-5 font-display text-xl italic text-gold-bright md:block md:text-2xl">
                  {slide.closing}
                </p>
              </div>
              <div
                className="reveal md:border md:border-gold/25 md:bg-ink/70 md:p-6 md:backdrop-blur-sm"
                style={delay(0.8)}
              >
                <h3 className="font-display text-base tracking-[0.15em] text-gold md:text-xl md:tracking-[0.2em]">
                  {slide.lessonsTitle}
                </h3>
                <ul className="mt-2 space-y-1.5 md:mt-4 md:space-y-3">
                  {slide.lessons.map((l, i) => (
                    <li key={l.title} className="reveal flex gap-3" style={delay(0.95 + i * 0.1)}>
                      <span className="mt-0.5 font-display text-base leading-none text-gold-deep md:text-xl">{num(i)}</span>
                      <p className="border-l border-gold/40 pl-3 text-sm leading-snug text-parchment/90 md:text-lg">
                        <span className="font-display tracking-wider text-gold-bright">{l.title}.</span> {l.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      );
  }
}
