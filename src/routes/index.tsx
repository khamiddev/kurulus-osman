import { createFileRoute } from "@tanstack/react-router";

import { Presentation } from "@/components/presentation/Presentation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kuruluş Osman — Основание: Осман" },
      {
        name: "description",
        content: "Презентация о сериале «Основание: Осман»: жизнь Османа, алпы, Бала-хатун, факты и уроки для нашего поколения.",
      },
      { property: "og:title", content: "Kuruluş Osman — Основание: Осман" },
      {
        property: "og:description",
        content: "Кинематографичная презентация о сериале «Основание: Осман» в 10 главах.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Presentation />;
}
