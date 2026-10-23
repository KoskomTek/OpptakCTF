"use client";

import { useState } from "react";
import { ChallengeFrame, Feedback } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

type Cabinet = "A" | "B" | "C";

const statements: Array<{
  cabinet: Cabinet;
  text: string;
  isTrue: (location: Cabinet) => boolean;
}> = [
  {
    cabinet: "A",
    text: "Nøkkelkortet ligger i skap B.",
    isTrue: (location) => location === "B",
  },
  {
    cabinet: "B",
    text: "Nøkkelkortet ligger ikke i skap B.",
    isTrue: (location) => location !== "B",
  },
  {
    cabinet: "C",
    text: "Nøkkelkortet ligger ikke i skap A.",
    isTrue: (location) => location !== "A",
  },
];

const hints = [
  "Test ett skap om gangen. Tell deretter hvor mange av de tre påstandene som blir sanne.",
  "Hvis kortet ligger i skap A, lyver skap A og C, mens skap B snakker sant.",
];

export function ChallengeThree({ onSolved }: { onSolved: () => void }) {
  const [selected, setSelected] = useState<Cabinet>();
  const [hintCount, setHintCount] = useState(0);
  const truthCount = selected
    ? statements.filter((statement) => statement.isTrue(selected)).length
    : 0;
  const solved = selected === "A" && truthCount === 1;

  return (
    <ChallengeFrame
      number="03"
      eyebrow="LOGISK ADGANGSKONTROLL"
      title="Sannhetsfilteret"
      intro="Nøkkelkortet ligger i ett av tre skap. Hvert skap har levert en påstand til internrevisjonen, men nøyaktig én av påstandene er sann. Finn skapet uten å utløse papirarbeidet."
    >
      <div className="logic-console">
        <div className="logic-toolbar">
          <span>PROTOKOLL // NØKKELKORT-LOKALISERING</span>
          <span><i /> ÉN SANNHET TILLATT</span>
        </div>
        <div className="logic-rule">
          <StatusIcon name="shield" className="h-5 w-5" />
          <p><strong>PREMISS:</strong> Nøkkelkortet ligger i nøyaktig ett skap, og nøyaktig én påstand er sann.</p>
        </div>
        <div className="statement-grid">
          {statements.map((statement) => {
            const result = selected ? statement.isTrue(selected) : undefined;
            return (
              <article key={statement.cabinet}>
                <span>SKAP {statement.cabinet}</span>
                <p>«{statement.text}»</p>
                {result !== undefined && (
                  <small className={result ? "is-true" : "is-false"}>
                    {result ? "SANN" : "USANN"}
                  </small>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <fieldset className="logic-options">
        <legend>Hvor ligger nøkkelkortet?</legend>
        {(["A", "B", "C"] as Cabinet[]).map((cabinet) => (
          <button
            className={selected === cabinet ? (solved ? "correct" : "wrong") : ""}
            key={cabinet}
            type="button"
            onClick={() => setSelected(cabinet)}
          >
            SKAP {cabinet}
          </button>
        ))}
      </fieldset>

      <div className="logic-hints">
        <div>
          <span>DEDUKSJONSHJELP</span>
          {hintCount < hints.length && (
            <button type="button" onClick={() => setHintCount((count) => count + 1)}>
              Vis hint {hintCount + 1} av {hints.length}
            </button>
          )}
        </div>
        {hints.slice(0, hintCount).map((hint, index) => (
          <p key={hint}><b>HINT {index + 1}</b>{hint}</p>
        ))}
      </div>

      {selected && (
        <Feedback type={solved ? "success" : "error"}>
          {solved
            ? "LOGISK KONSISTENS BEKREFTET. Skap A gir én sann påstand og et overraskende tørt nøkkelkort."
            : `Avvist: Med kortet i skap ${selected} blir ${truthCount} påstander sanne. Protokollen tillater nøyaktig én.`}
        </Feedback>
      )}

      {solved && (
        <button className="tek-primary" type="button" onClick={onSolved}>
          Hent nøkkelkortet <StatusIcon name="arrow" className="h-5 w-5" />
        </button>
      )}
    </ChallengeFrame>
  );
}
