"use client";

import { useCallback, useEffect, useState } from "react";
import { storageKey } from "@/config/ctf";
import { KoskomTekShell } from "./KoskomTekShell";
import { LandingPage } from "./LandingPage";
import { TakeoverSequence } from "./TakeoverSequence";

type Mode = "loading" | "landing" | "takeover" | "ctf";

type SavedProgress = {
  entered: boolean;
  step: number;
};

const LAST_STEP = 5;

export function KoskomExperience() {
  const [mode, setMode] = useState<Mode>("loading");
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) {
        setMode("landing");
        return;
      }

      const progress = JSON.parse(stored) as SavedProgress;
      if (progress.entered) {
        setStep(Math.min(Math.max(progress.step ?? 0, 0), LAST_STEP));
        setMode("ctf");
      } else {
        setMode("landing");
      }
    } catch {
      setMode("landing");
    }
  }, []);

  useEffect(() => {
    if (mode !== "ctf") return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ entered: true, step } satisfies SavedProgress),
    );
  }, [mode, step]);

  const finishTakeover = useCallback(() => {
    setStep(0);
    setMode("ctf");
  }, []);

  const restart = () => {
    const confirmed = window.confirm(
      "Vil du nullstille sikkerhetsklareringen og gå tilbake til Koskom?",
    );
    if (!confirmed) return;

    window.localStorage.removeItem(storageKey);
    setStep(0);
    setMode("landing");
  };

  if (mode === "loading") {
    return (
      <main className="loading-screen" aria-label="Laster Koskom">
        <span className="loading-mark" />
      </main>
    );
  }

  if (mode === "landing") {
    return <LandingPage onExplore={() => setMode("takeover")} />;
  }

  if (mode === "takeover") {
    return <TakeoverSequence onComplete={finishTakeover} />;
  }

  return <KoskomTekShell step={step} onStepChange={setStep} onRestart={restart} />;
}
