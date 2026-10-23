"use client";

import Image from "next/image";
import { ctfConfig } from "@/config/ctf";
import {
  ChallengeFive,
  ChallengeFour,
  ChallengeOne,
  ChallengeSix,
  ChallengeThree,
  ChallengeTwo,
} from "./challenges";
import { StatusIcon } from "./StatusIcon";

const steps = [
  { short: "KAFFE", title: "Kaffeautentisering" },
  { short: "SNACK", title: "SnackOverflow" },
  { short: "LOGIKK", title: "Sannhetsfilteret" },
  { short: "INSPECT", title: "Inspect Element" },
  { short: "PROTOKOLL", title: "Nødprotokoll" },
  { short: "GODKJENT", title: "Sikkerhetsklarering" },
] as const;

export function KoskomTekShell({
  step,
  onStepChange,
  onRestart,
}: {
  step: number;
  onStepChange: (step: number) => void;
  onRestart: () => void;
}) {
  const next = () => onStepChange(Math.min(step + 1, steps.length - 1));
  const challenge = [
    <ChallengeOne key="one" onSolved={next} />,
    <ChallengeTwo key="two" onSolved={next} />,
    <ChallengeThree key="three" onSolved={next} />,
    <ChallengeFour key="four" onSolved={next} />,
    <ChallengeFive key="five" onSolved={next} />,
    <ChallengeSix key="six" />,
  ][step];

  return (
    <main className="tek-shell min-h-screen">
      <div className="tek-grid" aria-hidden="true" />
      <header className="tek-header">
        <div className="tek-identity">
          <Image
            src={ctfConfig.koskomTekLogoPath}
            width={62}
            height={62}
            alt="KoskomTek-logo"
            priority
          />
          <div>
            <span>KOSKOMTEK</span>
            <small>AVD. FOR KAFFE- OG SNACKSIKKERHET</small>
          </div>
        </div>
        <div className="tek-header-actions">
          <div className="system-online"><i /> SYSTEM OPERATIVT</div>
          <button type="button" onClick={onRestart}>
            <StatusIcon name="refresh" className="h-4 w-4" />
            <span className="hidden sm:inline">Start på nytt</span>
          </button>
        </div>
      </header>

      <div className="tek-workspace">
        <aside className="progress-panel" aria-label="Fremdrift">
          <div className="progress-kicker">KLARERINGSLØP</div>
          <div className="progress-fraction">
            <strong>{String(step + 1).padStart(2, "0")}</strong>
            <span>/ 06</span>
          </div>
          <div
            className="progress-meter"
            role="progressbar"
            aria-label={`Oppgave ${step + 1} av 6`}
            aria-valuemin={1}
            aria-valuemax={6}
            aria-valuenow={step + 1}
          >
            <i style={{ width: `${((step + 1) / 6) * 100}%` }} />
          </div>
          <ol className="step-list">
            {steps.map((item, index) => (
              <li
                className={index === step ? "active" : index < step ? "complete" : ""}
                key={item.short}
              >
                <span>{index < step ? <StatusIcon name="check" className="h-4 w-4" /> : index + 1}</span>
                <div><strong>{item.short}</strong><small>{item.title}</small></div>
              </li>
            ))}
          </ol>
          <div className="operator-card">
            <StatusIcon name="shield" className="h-5 w-5" />
            <div><span>OPERATØR</span><strong>ABAKULE_UKJENT</strong></div>
          </div>
        </aside>

        <section className="challenge-stage" aria-labelledby="challenge-title">
          <div className="clearance-strip">
            <span><i /> SIKKER KANAL // 256-BIT KAFFE</span>
            <span>SAKSNR. KT-{new Date().getFullYear()}-042</span>
          </div>
          {challenge}
        </section>
      </div>

      <footer className="tek-footer">
        <span>KOSKOMTEK INTERN TJENESTE</span>
        <span>Dette er et studentlaget spill — ikke ekte sikkerhet.</span>
      </footer>
    </main>
  );
}
