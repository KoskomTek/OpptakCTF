"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ctfConfig } from "@/config/ctf";
import { StatusIcon } from "./StatusIcon";

const terminalLines = [
  "> INITIALIZING KOSKOM SECURITY PROTOCOL...",
  "> CONNECTING TO SNACKOVERFLOW...",
  "> VERIFYING CAFFEINE LEVELS...",
  "> ERROR: INSUFFICIENT SECURITY CLEARANCE.",
  "> UNAUTHORIZED ABAKULE DETECTED.",
  "> KOSKOMTEK HAS TAKEN CONTROL.",
];

type Phase = "freeze" | "warning" | "blackout" | "terminal";

export function TakeoverSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("freeze");
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay));
    };

    if (reduced) {
      setPhase("terminal");
      setVisibleLines(terminalLines.length);
      schedule(onComplete, 1200);
    } else {
      schedule(() => setPhase("warning"), 450);
      schedule(() => setPhase("blackout"), 1850);
      schedule(() => setPhase("terminal"), 2200);
      terminalLines.forEach((_, index) => {
        schedule(() => setVisibleLines(index + 1), 2450 + index * 380);
      });
      schedule(onComplete, 5050);
    }

    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <main className={`takeover-screen phase-${phase}`} aria-live="polite">
      <div className="takeover-scanlines" aria-hidden="true" />
      <button className="skip-takeover" type="button" onClick={onComplete}>
        Hopp over intro
      </button>

      {(phase === "freeze" || phase === "warning") && (
        <div className="breach-stage">
          <div className="morph-logo" aria-hidden="true">
            <Image
              className="morph-original"
              src={ctfConfig.koskomLogoPath}
              width={190}
              height={190}
              alt=""
              priority
            />
            <Image
              className="morph-taken"
              src={ctfConfig.koskomTekLogoPath}
              width={230}
              height={230}
              alt=""
              priority
            />
          </div>
          {phase === "warning" && (
            <div className="breach-warning" role="alert">
              <StatusIcon name="warning" className="h-7 w-7" />
              <span data-text="UNAUTHORIZED ACCESS DETECTED">
                UNAUTHORIZED ACCESS DETECTED
              </span>
              <small>SIKKERHETSBRUDD // KODE: TOM_KAFFEKANNE</small>
            </div>
          )}
        </div>
      )}

      {phase === "terminal" && (
        <div className="boot-terminal">
          <div className="boot-bar">
            <span><i /> KOSKOMTEK SIKKER OPPSTART</span>
            <span>v20.02</span>
          </div>
          <div className="boot-content">
            {terminalLines.slice(0, visibleLines).map((line, index) => (
              <p
                className={line.includes("ERROR") || line.includes("UNAUTHORIZED") ? "terminal-error" : ""}
                key={line}
              >
                {line}
                {index === visibleLines - 1 && <span className="terminal-cursor" />}
              </p>
            ))}
          </div>
          <div className="boot-progress" aria-hidden="true"><i /></div>
        </div>
      )}
    </main>
  );
}
