import { createFileRoute } from "@tanstack/react-router";
import { PracticeApp } from "@/components/practice-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satzwerk — Practice German Translation" },
      {
        name: "description",
        content:
          "Practice German actively by translating English sentences across CEFR levels A1 to C1.",
      },
      { property: "og:title", content: "Satzwerk — Practice German Translation" },
      {
        property: "og:description",
        content:
          "Practice German actively by translating English sentences across CEFR levels A1 to C1.",
      },
    ],
  }),
  component: PracticeApp,
});
