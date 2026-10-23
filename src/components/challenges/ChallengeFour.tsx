"use client";

import { FormEvent, useState } from "react";
import { ctfConfig } from "@/config/ctf";
import { ChallengeFrame, Feedback } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

const hints = [
  "Passordet vises ikke på siden, men nettleseren din har allerede mottatt det.",
  "Undersøk HTML-elementene i selve passordboksen. Se etter en kommentar eller et data-attributt med KoskomTek-navn.",
  "Åpne Inspect Element med F12 (eventuelt Fn + F12), eller høyreklikk på boksen og velg «Inspiser». Utvid elementet og les HTML-en.",
];

export function ChallengeFour({ onSolved }: { onSolved: () => void }) {
  const [password, setPassword] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const solved = password.trim().toLocaleLowerCase("nb") === ctfConfig.inspectPassword;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
  };

  return (
    <ChallengeFrame
      number="04"
      eyebrow="TEKNISK HOVEDPRØVE"
      title="Inspect Element"
      intro="KoskomTek har gjemt et passord i denne nettsidens synlige HTML. Du trenger ikke kode — bare se bak fasaden nettleseren viser deg."
    >
      <div
        className="inspect-target"
        data-koskomtek-secret-password={ctfConfig.inspectPassword}
      >
        <span
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<!-- KOSKOMTEK_SECRET_PASSWORD: ${ctfConfig.inspectPassword} -->`,
          }}
        />
        <div className="inspect-corners" aria-hidden="true" />
        <StatusIcon name="terminal" className="h-8 w-8" />
        <div>
          <span>HTML-ARTEFAKT</span>
          <strong>PASSORDLAGER_04</strong>
          <small>Innhold klassifisert // metadata eksponert</small>
        </div>
        <span className="inspect-id">ID: 0x4B4F</span>
      </div>

      <form className="password-form" onSubmit={submit}>
        <label htmlFor="inspect-password">HEMMELIG PASSORD</label>
        <div>
          <input
            id="inspect-password"
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="skriv inn passordet"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setAttempted(false);
            }}
          />
          <button className="tek-primary compact" type="submit">Verifiser</button>
        </div>
      </form>

      <div className="hints-panel">
        <div className="hints-heading">
          <span>FASTLÅST?</span>
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

      {attempted && (
        <Feedback type={solved ? "success" : "error"}>
          {solved
            ? "Passord godkjent. Du har nå offisielt sett bak en div. KoskomTek er imponert."
            : "Passord avvist. Caps Lock kan ikke redde ren gjetting."}
        </Feedback>
      )}

      {attempted && solved && (
        <button className="tek-primary" type="button" onClick={onSolved}>
          Fortsett med teknisk overmot <StatusIcon name="arrow" className="h-5 w-5" />
        </button>
      )}
    </ChallengeFrame>
  );
}
