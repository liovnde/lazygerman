import { useEffect, useMemo, useState } from "react";
import { Moon, Sun, Eye, RotateCcw, ArrowRight, Languages, Sparkles, BookOpen, MessageCircle, GraduationCap, Shuffle, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { modeSets, pickRandomTopic, type CEFRLevel, type PracticeMode, type Topic } from "@/data/sentences";

const LEVELS: { id: CEFRLevel; label: string }[] = [
  { id: "A1", label: "Beginner" },
  { id: "A2", label: "Elementary" },
  { id: "B1", label: "Intermediate" },
  { id: "B2", label: "Upper-Int." },
  { id: "C1", label: "Advanced" },
];

const MODES: { id: PracticeMode; label: string; icon: typeof BookOpen; description: string }[] = [
  { id: "translation", label: "Translation", icon: BookOpen, description: "General sentences" },
  { id: "daily", label: "Daily Conversation", icon: MessageCircle, description: "Everyday phrases" },
  { id: "exam", label: "Exam Preparation", icon: GraduationCap, description: "Goethe / telc style" },
];

type PromptLang = "en" | "vi";

export function PracticeApp() {
  const { theme, toggle } = useTheme();
  const [mode, setMode] = useState<PracticeMode>("translation");
  const [level, setLevel] = useState<CEFRLevel>("A1");
  const [topic, setTopic] = useState<Topic>(() => pickRandomTopic(modeSets["translation"]["A1"]));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [promptLang, setPromptLang] = useState<PromptLang>("en");

  // Ensure topic stays valid if mode/level change externally
  useEffect(() => {
    const topics = modeSets[mode][level];
    if (!topics.some((t) => t.id === topic.id)) {
      setTopic(pickRandomTopic(topics));
      setIndex(0);
      setAnswer("");
      setRevealed(false);
    }
  }, [mode, level, topic.id]);

  const sentences = topic.sentences;
  const current = sentences[index];
  const total = sentences.length;
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  const startNewTopic = (nextMode: PracticeMode, nextLevel: CEFRLevel, excludeCurrent = false) => {
    const topics = modeSets[nextMode][nextLevel];
    const next = pickRandomTopic(topics, excludeCurrent ? topic.id : undefined);
    setTopic(next);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
  };

  const selectLevel = (l: CEFRLevel) => {
    if (l === level) return;
    setLevel(l);
    startNewTopic(mode, l);
  };

  const selectMode = (m: PracticeMode) => {
    if (m === mode) return;
    setMode(m);
    startNewTopic(m, level);
  };

  const shuffleTopic = () => startNewTopic(mode, level, true);

  const next = () => {
    if (index + 1 >= total) {
      // Finished topic → pick a new random topic
      startNewTopic(mode, level, true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer("");
    setRevealed(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Languages className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-semibold tracking-tight">Satzwerk</h1>
              <p className="text-xs text-muted-foreground">German translation practice</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Mode toggle */}
        <div className="mb-6">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Practice Mode
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  onClick={() => selectMode(m.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                    active
                      ? "border-primary/40 bg-primary-soft shadow-sm"
                      : "border-border bg-card hover:border-primary/30 hover:bg-muted",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar / Level selector */}
          <aside className="space-y-4">
            <div>
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CEFR Level
              </p>
              <div className="grid grid-cols-5 gap-1.5 lg:grid-cols-1">
                {LEVELS.map((l) => {
                  const active = l.id === level;
                  return (
                    <button
                      key={l.id}
                      onClick={() => selectLevel(l.id)}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all",
                        active
                          ? "border-primary/40 bg-primary-soft text-accent-foreground shadow-sm"
                          : "border-border bg-card hover:border-primary/30 hover:bg-muted",
                      )}
                    >
                      <span className="text-sm font-semibold">{l.id}</span>
                      <span className="hidden text-xs text-muted-foreground lg:inline">
                        {l.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Card className="hidden border-dashed bg-muted/40 lg:block">
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Tip
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Translate the sentence yourself first. Reveal the answer only after you commit —
                  active recall makes it stick.
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Practice area */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs">
                  {level}
                </Badge>
                <Badge variant="outline" className="rounded-full border-primary/30 bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  {topic.title}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {index + 1} / {total}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shuffleTopic}
                  className="h-8 rounded-full text-xs"
                >
                  <Shuffle className="mr-1.5 h-3.5 w-3.5" />
                  New topic
                </Button>
                <div className="w-24">
                  <Progress value={progress} className="h-1.5" />
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Translate to German
                  </p>
                  <p className="text-balance text-2xl font-medium leading-snug sm:text-3xl">
                    {current.english}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="answer"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Your answer
                  </label>
                  <Textarea
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Schreibe deine Übersetzung hier…"
                    rows={3}
                    className="resize-none rounded-xl text-base"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setRevealed(true)}
                    disabled={revealed}
                    className="rounded-full"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Show correct answer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setAnswer("")}
                    className="rounded-full"
                    disabled={!answer}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                  <Button variant="ghost" onClick={next} className="ml-auto rounded-full">
                    Next sentence
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {revealed && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 rounded-2xl border border-primary/30 bg-primary-soft/60 p-5">
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium uppercase tracking-wider text-accent-foreground/80">
                        Correct translation
                      </p>
                      <p className="text-balance text-xl font-medium leading-snug text-foreground sm:text-2xl">
                        {current.german}
                      </p>
                    </div>

                    {current.note && (
                      <div className="border-t border-primary/20 pt-3">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Note
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/80">{current.note}</p>
                      </div>
                    )}

                    {current.keywords && current.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {current.keywords.map((k) => (
                          <Badge
                            key={k}
                            variant="outline"
                            className="rounded-full border-primary/30 bg-background/60 text-xs font-normal"
                          >
                            {k}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground">
              Practice actively — no scoring, no pressure. Just consistent reps.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
