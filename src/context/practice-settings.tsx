import { createContext, useContext, useState, type ReactNode } from "react";
import type { CEFRLevel, PracticeMode } from "@/data/sentences";

type Ctx = {
  mode: PracticeMode;
  level: CEFRLevel;
  setMode: (m: PracticeMode) => void;
  setLevel: (l: CEFRLevel) => void;
};

const PracticeSettingsContext = createContext<Ctx | null>(null);

export function PracticeSettingsProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PracticeMode>("translation");
  const [level, setLevel] = useState<CEFRLevel>("A1");
  return (
    <PracticeSettingsContext.Provider value={{ mode, level, setMode, setLevel }}>
      {children}
    </PracticeSettingsContext.Provider>
  );
}

export function usePracticeSettings() {
  const ctx = useContext(PracticeSettingsContext);
  if (!ctx) throw new Error("usePracticeSettings must be used within PracticeSettingsProvider");
  return ctx;
}
