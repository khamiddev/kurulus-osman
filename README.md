# Kuruluş Osman — interaktiv taqdimot

Usmon G‘oziy va «Asos: Usmon» (Kuruluş Osman) seriali haqida 10 sahifalik
interaktiv taqdimot: treyler, hayoti, janglari, alplari, Bala xotun,
Burak Özçivit, qiziqarli faktlar va xulosa.

**Til:** ruscha (sahifa matnlari). **Texnologiya:** TanStack Start + React 19 + Tailwind CSS v4.

## Ishga tushirish

```sh
npm i        # yoki: bun install
npm run dev  # yoki: bun run dev
```

So‘ng brauzerda `http://localhost:8080` manzilini oching.

## Boshqaruv

| Amal | Qanday |
| --- | --- |
| Keyinga / oldinga | ← → , Space, PageUp/PageDown, g‘ildirak, barmoq surish |
| Birinchi / oxirgi sahifa | Home / End |
| Butun ekran | F tugmasi yoki «На весь экран» tugmasi |
| Musiqa | Yuqoridagi tugma (YouTube orqali) |
| Treyler | 1-sahifadagi tugma |

## Tuzilish

- `src/lib/slides.ts` — barcha sahifalarning matni va tartibi (shu yerdan o‘zgartiriladi).
- `src/components/presentation/` — sahifalarni chizuvchi komponentlar.
- `src/styles.css` — dizayn tizimi (oltin ranglar, shriftlar, animatsiyalar).
- `public/media/` — rasmlar va treyler videosi; `src/assets/*.asset.json` orqali ulanadi.
- `src/test/` — sahifalar tartibi va marshrutlar uchun testlar (`npm test`).

## Qurish

```sh
npm run build
npm run preview
```

## Eslatma

Musiqa va treyler YouTube’da joylashgan, shuning uchun ular uchun internet
kerak. Rasmlar va video `public/media/` ichida, repozitoriyada turadi.
