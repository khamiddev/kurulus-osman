import hero from "@/assets/hero.jpg.asset.json";
import osmanThrone from "@/assets/osman-throne.jpg.asset.json";
import courage from "@/assets/courage.jpg.asset.json";
import osmanCourage from "@/assets/osman-courage.jpg.asset.json";
import conquest from "@/assets/conquest.jpg.asset.json";
import alps from "@/assets/alps.jpg.asset.json";
import alpBamsi from "@/assets/alp-bamsi.jpg.asset.json";
import alpTurgut from "@/assets/alp-turgut.jpg.asset.json";
import alpBoran from "@/assets/alp-boran.jpg.asset.json";
import alpCerkutay from "@/assets/alp-cerkutay.jpg.asset.json";
import alpGoktug from "@/assets/alp-goktug.jpg.asset.json";
import alpKonur from "@/assets/alp-konur.jpg.asset.json";
import balaHatun from "@/assets/bala-hatun.jpg.asset.json";
import balaHatunSmile from "@/assets/bala-hatun-smile.jpg.asset.json";
import actor from "@/assets/actor.jpg.asset.json";
import kayiVillage from "@/assets/kayi-village.jpg.asset.json";
import osmanSword from "@/assets/osman-sword.jpg.asset.json";
import finale from "@/assets/finale.jpg.asset.json";
import trailer from "@/assets/trailer.mp4.asset.json";

export const MUSIC_YOUTUBE_ID = "SEJGNGw2nY4";

type Item = { title: string; text: string };

export type Slide =
  | {
      kind: "trailer";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      lead: string;
      poster: string;
      video: string;
      trailerYoutubeId: string;
      trailerLabel: string;
    }
  | {
      kind: "list";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      image: string;
      /** Keeps faces in frame when the photo is cropped to fill the screen. */
      focus?: "top" | "center";
      items: Item[];
    }
  | {
      kind: "story";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      image: string;
      photo: string;
      photoAlt: string;
      text: string;
      quote: string;
    }
  | {
      kind: "alps";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      image: string;
      items: (Item & { photo: string })[];
    }
  | {
      kind: "heroine";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      subtitle: string;
      photo: string;
      photoSecondary: string;
      text: string;
      facts: string[];
    }
  | { kind: "portrait"; id: string; nav: string; eyebrow: string; title: string; image: string; text: string; facts: string[] }
  | { kind: "finale"; id: string; nav: string; eyebrow: string; title: string; image: string; text: string }
  | {
      kind: "about";
      id: string;
      nav: string;
      eyebrow: string;
      title: string;
      image: string;
      imageAlt: string;
      storyTitle: string;
      story: string;
      lessonsTitle: string;
      lessons: Item[];
      closing: string;
    };

export const SLIDES: Slide[] = [
  {
    kind: "trailer",
    id: "intro",
    nav: "Пролог",
    eyebrow: "Kuruluş Osman · 2019",
    title: "Основание: Осман",
    lead: "Путешествие в XIII век — к истокам великой Османской империи. В главной роли — Бурак Озчивит.",
    poster: hero.url,
    video: trailer.url,
    trailerYoutubeId: "cpFAbdDL0IM",
    trailerLabel: "Русский трейлер · 0:46",
  },
  {
    kind: "list",
    id: "life",
    nav: "Жизнь",
    eyebrow: "Глава I",
    title: "Жизнь Османа",
    image: osmanThrone.url,
    focus: "top",
    items: [
      { title: "Рождение", text: "Около 1258 года в Сёгюте, в семье Эртугрула-гази, вождя племени Кайы." },
      { title: "Наследник", text: "После смерти отца возглавил племя и превратил его в государство." },
      { title: "Семья", text: "Жёны — Мальхун-хатун и Бала-хатун; сын Орхан продолжил его дело." },
      { title: "Конец пути", text: "Умер в 1326 году; похоронен в Бурсе — первой столице османов." },
    ],
  },
  {
    kind: "story",
    id: "courage",
    nav: "Отвага",
    eyebrow: "Глава II",
    title: "Отвага без страха",
    image: courage.url,
    photo: osmanCourage.url,
    photoAlt: "Бурак Озчивит в роли Османа-бея",
    text: "Осман-бей шёл в бой первым. Он не боялся ни византийских текфуров, ни монгольских армий, ни предателей внутри племени. Его девиз — справедливость и вера.",
    quote: "«Государство — это не земля, а народ»",
  },
  {
    kind: "list",
    id: "conquests",
    nav: "Завоевания",
    eyebrow: "Глава III",
    title: "Завоевания",
    image: conquest.url,
    items: [
      { title: "Караджахисар", text: "Одна из первых крепостей — ок. 1288 года." },
      { title: "Биледжик и Ярхисар", text: "Взяты ок. 1299 года — рождение бейлика." },
      { title: "Инегёль и Енишехир", text: "Енишехир стал новой ставкой Османа." },
      { title: "Бафей, 1302", text: "Победа над византийской армией у Никомедии." },
    ],
  },
  {
    kind: "alps",
    id: "alps",
    nav: "Алпы",
    eyebrow: "Глава IV",
    title: "Верные алпы",
    image: alps.url,
    items: [
      { title: "Бамсы-бей", text: "Старый богатырь, весёлый и непобедимый.", photo: alpBamsi.url },
      { title: "Тургут-бей", text: "Легендарный воин с секирой, соратник Эртугрула.", photo: alpTurgut.url },
      { title: "Борань-алп", text: "Правая рука Османа: мастер меча и саза.", photo: alpBoran.url },
      { title: "Черкутай", text: "Бывший монгольский воин — сила и юмор, любимец зрителей.", photo: alpCerkutay.url },
      {
        title: "Гёктуг-алп",
        text: "Бывший монгольский командир Конгар: принял ислам и отдал жизнь за дело Османа.",
        photo: alpGoktug.url,
      },
      {
        title: "Конур-алп",
        text: "Реальный полководец: из врага стал верным соратником и героем взятия Бурсы.",
        photo: alpKonur.url,
      },
    ],
  },
  {
    kind: "heroine",
    id: "bala",
    nav: "Бала-хатун",
    eyebrow: "Глава V",
    title: "Бала-хатун",
    subtitle: "Озге Тёрер",
    photo: balaHatun.url,
    photoSecondary: balaHatunSmile.url,
    text: "Дочь шейха Эдебали и любимая жена Османа-бея — мудрая, смелая и верная. Её роль исполнила Озге Тёрер: для неё это был первый проект, который принёс ей славу.",
    facts: ["1999 · Турция", "Дебют в кино", "«Хрустальный глобус» — лучшая актриса"],
  },
  {
    kind: "portrait",
    id: "actor",
    nav: "Актёр",
    eyebrow: "Глава VI",
    title: "Бурак Озчивит",
    image: actor.url,
    text: "Турецкий актёр, родился в 1984 году в Стамбуле. Ради роли он месяцами тренировался: верховая езда, бой на мечах, стрельба из лука. Многие трюки он исполнял сам.",
    facts: ["1984 · Стамбул", "Верховая езда", "Бой на мечах", "Стрельба из лука"],
  },
  {
    kind: "list",
    id: "facts",
    nav: "Факты",
    eyebrow: "Глава VII",
    title: "Интересные факты",
    image: kayiVillage.url,
    items: [
      { title: "Сон Османа", text: "Шейх Эдебали истолковал его сон о великом дереве как знак будущей империи." },
      { title: "Продолжение", text: "Сериал — продолжение «Воскресшего Эртугрула»." },
      { title: "Огромные декорации", text: "Целая деревня XIII века построена под Стамбулом." },
      { title: "Мировая слава", text: "Сериал смотрят более чем в 100 странах." },
    ],
  },
  {
    kind: "about",
    id: "about",
    nav: "О сериале",
    eyebrow: "Эпилог",
    title: "О чём этот сериал",
    image: osmanSword.url,
    imageAlt: "Осман-бей поднимает меч",
    storyTitle: "Сюжет",
    story:
      "«Основание: Осман» (2019–2025) — историческая драма о молодом Османе, сыне Эртугрула-гази. Он объединяет племя Кайы, сражается с Византией, монголами и предателями и закладывает основу государства, которое станет Османской империей и простоит более шести веков.",
    lessonsTitle: "Что он даёт нашему поколению",
    lessons: [
      { title: "Верность и дружба", text: "Алпы стоят друг за друга до конца — настоящий друг познаётся в беде." },
      { title: "Справедливость", text: "Сила нужна не для гордости, а чтобы защищать слабых." },
      { title: "Мечта и цель", text: "Из маленького племени выросла великая держава — большие дела начинаются с малого." },
      { title: "Уважение к корням", text: "Почитать родителей, старших, свою историю и веру." },
      { title: "Стойкость", text: "Не сдаваться после поражений и снова подниматься в седло." },
    ],
    closing: "Главный урок: великие дела рождаются из веры, единства и честного сердца.",
  },
  {
    kind: "finale",
    id: "finale",
    nav: "Финал",
    eyebrow: "Конец",
    title: "Devlet olma vakti",
    image: finale.url,
    text: "«Пришло время стать государством». Спасибо за внимание!",
  },
];
