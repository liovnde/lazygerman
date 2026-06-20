import { useEffect, useMemo, useState } from "react";
import { Eye, RotateCcw, ArrowRight, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { modeSets, pickRandomTopic, type Topic } from "@/data/sentences";
import { usePracticeSettings } from "@/context/practice-settings";
import { useScrambleText } from "@/hooks/use-scramble-text";

function RevealText({ text }: { text: string }) {
  return <span className="animate-fade-in inline-block">{text}</span>;
}

type PromptLang = "en" | "vi" | "es";

export function PracticeApp() {
  const { mode, level } = usePracticeSettings();

  // Deterministic initial topic for SSR/hydration parity. Randomize after mount.
  const [topic, setTopic] = useState<Topic>(() => modeSets["translation"]["A1"][0]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [promptLang, setPromptLang] = useState<PromptLang>("en");

  // After hydration, pick a random topic for the current mode/level.
  useEffect(() => {
    const topics = modeSets[mode][level];
    if (!topics.some((t) => t.id === topic.id)) {
      setTopic(pickRandomTopic(topics));
      setIndex(0);
      setAnswer("");
      setRevealed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, level]);

  // Initial randomize after first mount only.
  useEffect(() => {
    setTopic(pickRandomTopic(modeSets[mode][level]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sentences = topic.sentences;
  const current = sentences[index];
  const total = sentences.length;
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  const startNewTopic = (excludeCurrent = false) => {
    const topics = modeSets[mode][level];
    const next = pickRandomTopic(topics, excludeCurrent ? topic.id : undefined);
    setTopic(next);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
  };

  const next = () => {
    if (index + 1 >= total) {
      startNewTopic(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer("");
    setRevealed(false);
  };

  const langOptions: { id: PromptLang; label: string; available: boolean }[] = [
    { id: "en", label: "EN", available: true },
    { id: "vi", label: "VI", available: !!current.vietnamese },
    { id: "es", label: "ES", available: !!current.spanish },
  ];

  const localized =
    promptLang === "vi"
      ? current.vietnamese
      : promptLang === "es"
        ? current.spanish
        : undefined;
  const display = localized ?? current.english;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-16">
      {/* Eyebrow */}
      <div className="mb-8 flex items-center justify-between">
        <div className="font-display flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-primary">Übersetzung</span>
          <span className="text-border">·</span>
          <span>{topic.title}</span>
          <span className="text-border">·</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <button
          type="button"
          onClick={() => startNewTopic(true)}
          className="font-display inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Shuffle className="h-3 w-3" />
          New topic
        </button>
      </div>

      {/* Progress hairline */}
      <div className="mb-10 h-px w-full bg-border">
        <div
          className="h-px bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Language underline tabs */}
      <div className="mb-6 flex gap-6 border-b border-border">
        {langOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={!opt.available}
            onClick={() => opt.available && setPromptLang(opt.id)}
            className={cn(
              "font-display -mb-px border-b-2 pb-2 text-xs font-medium tracking-[0.15em] transition-colors",
              promptLang === opt.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
              !opt.available && "cursor-not-allowed opacity-30 hover:text-muted-foreground",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <div className="mb-10 space-y-3">
        <h1
          className="font-display text-balance text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {useScrambleText(display)}
        </h1>
        {localized && (
          <p className="text-sm italic text-muted-foreground">{current.english}</p>
        )}
      </div>

      {/* Notebook-line textarea */}
      <div className="mb-8">
        <label
          htmlFor="answer"
          className="font-display mb-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          Your translation
        </label>
        <Textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Schreibe deine Übersetzung hier…"
          rows={3}
          className="resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-lg leading-relaxed shadow-none focus-visible:border-primary focus-visible:ring-0"
        />
      </div>

      {/* Actions */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <Button
          onClick={() => setRevealed(true)}
          disabled={revealed}
          className="font-display rounded-none px-5 text-[11px] uppercase tracking-[0.18em]"
        >
          <Eye className="mr-2 h-4 w-4" />
          Show answer
        </Button>
        <Button
          variant="ghost"
          onClick={() => setAnswer("")}
          className="font-display rounded-none px-3 text-[11px] uppercase tracking-[0.18em]"
          disabled={!answer}
        >
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          Clear
        </Button>
        <button
          type="button"
          onClick={next}
          className="font-display ml-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
        >
          Next
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Reveal */}
      {revealed && (
        <div className="space-y-5 border-l-2 border-primary pl-5">
          <div>
            <p className="font-display mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              German
            </p>
            <p className="font-display text-balance text-2xl font-medium leading-snug sm:text-3xl" style={{ fontVariantNumeric: "tabular-nums" }}>
              <RevealText text={current.german} />
            </p>
          </div>

          {current.note && (
            <div>
              <p className="font-display mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Note
              </p>
              <p className="text-sm italic leading-relaxed text-foreground/80">{current.note}</p>
            </div>
          )}

          {current.keywords && current.keywords.length > 0 && (
            <div>
              <p className="font-display mb-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Keywords
              </p>
              <p className="font-display text-sm tracking-wide text-foreground/80">
                {current.keywords.map((k, i) => (
                  <span key={k}>
                    {i > 0 && <span className="mx-2 text-border">·</span>}
                    {k}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
