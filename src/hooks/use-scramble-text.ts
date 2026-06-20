import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäöüÄÖÜß!?#%&*";

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function randChar(chars: string) {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export function useScrambleText(
  target: string,
  opts: { duration?: number; tick?: number; chars?: string } = {},
): string {
  const { duration = 600, tick = 35, chars = DEFAULT_CHARS } = opts;
  const [output, setOutput] = useState(() => {
    if (typeof window === "undefined" || !target) return target;
    return target
      .split("")
      .map((ch) => {
        if (ch === " " || ch === "\n" || /[.,;:!?¿¡"'()\-—–]/.test(ch)) return ch;
        return randChar(chars);
      })
      .join("");
  });
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !target) {
      setOutput(target);
      return;
    }

    const start = performance.now();
    const len = target.length;

    const stop = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      intervalRef.current = null;
      rafRef.current = null;
    };

    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealUpTo = Math.floor(progress * len);

      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (i < revealUpTo || ch === " " || ch === "\n" || /[.,;:!?¿¡"'()\-—–]/.test(ch)) {
          out += ch;
        } else {
          out += randChar(chars);
        }
      }
      setOutput(out);

      if (progress >= 1) {
        setOutput(target);
        stop();
      }
    }, tick);

    return stop;
  }, [target, duration, tick, chars]);

  return output;
}
