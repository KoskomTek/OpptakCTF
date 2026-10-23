"use client";

import { useState } from "react";
import { ChallengeFrame, Feedback } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

const choices = [
  { id: "printer", label: "Printerpapir", note: "Kan brettes til en kopp i nødstilfeller." },
  { id: "coffee", label: "Gratis kaffe", note: "Korrekt. Kritisk infrastruktur oppdaget." },
  { id: "wifi", label: "Stabilt Wi-Fi", note: "Optimistisk. Men ikke viktigst." },
  { id: "plant", label: "Kontorplanten", note: "Planten har ikke sikkerhetsklarering." },
] as const;

export function ChallengeOne({ onSolved }: { onSolved: () => void }) {
  const [selected, setSelected] = useState<string>();
  const [solved, setSolved] = useState(false);

  const choose = (id: string) => {
    setSelected(id);
    setSolved(id === "coffee");
  };

  return (
    <ChallengeFrame
      number="01"
      eyebrow="GRUNNLEGGENDE RESSURSKONTROLL"
      title="Kaffeautentisering"
      intro="Før du får gå videre må KoskomTek verifisere at prioriteringene dine er i orden. Kun ett svar hindrer total komitékollaps."
    >
      <fieldset className="choice-grid">
        <legend>Hva er den viktigste ressursen på Abakus-kontoret?</legend>
        {choices.map((choice, index) => (
          <button
            className={`choice-card ${selected === choice.id ? (solved ? "correct" : "wrong") : ""}`}
            key={choice.id}
            type="button"
            onClick={() => choose(choice.id)}
          >
            <span>{String.fromCharCode(65 + index)}</span>
            <strong>{choice.label}</strong>
            <i />
          </button>
        ))}
      </fieldset>

      {selected && (
        <Feedback type={solved ? "success" : "error"}>
          {choices.find((choice) => choice.id === selected)?.note}
        </Feedback>
      )}

      {solved && (
        <button className="tek-primary" type="button" onClick={onSolved}>
          Ressurs verifisert <StatusIcon name="arrow" className="h-5 w-5" />
        </button>
      )}
    </ChallengeFrame>
  );
}
