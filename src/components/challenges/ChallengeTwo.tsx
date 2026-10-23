"use client";

import { FormEvent, useState } from "react";
import { ctfConfig } from "@/config/ctf";
import { ChallengeFrame, Feedback } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

const baseLogs = [
  ["08:41:03", "INFO", "Kobler til SnackOverflow / hylle_03"],
  ["08:41:04", "WARN", "Ostepop-beholdning: KRITISK LAV"],
  ["08:41:05", "INFO", "Kjekssensor returnerte HTTP 418: I'M A TEAPOT"],
  ["08:41:06", "WARN", "Koffeinnivå 12% — produktivitet ikke garantert"],
  ["08:41:07", "AUTH", `Midlertidig adgangskode generert: ${ctfConfig.snackOverflowPin}`],
  ["08:41:08", "ERROR", "Uautorisert hånd observert nær siste Kvikk Lunsj"],
] as const;

export function ChallengeTwo({ onSolved }: { onSolved: () => void }) {
  const [pin, setPin] = useState("");
  const [attempted, setAttempted] = useState(false);
  const solved = pin === ctfConfig.snackOverflowPin;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
  };

  return (
    <ChallengeFrame
      number="02"
      eyebrow="LOGGANALYSE // SNACKOVERFLOW"
      title="Finn adgangskoden"
      intro="Snackskapet har låst seg etter mistenkelig aktivitet. Les systemloggen og finn den firesifrede adgangskoden før noen må spise en faktisk middag."
    >
      <div className="log-window">
        <div className="log-titlebar">
          <span><i /><i /><i /></span>
          <strong>snackoverflow.log</strong>
          <span>DIREKTE</span>
        </div>
        <div className="log-body" role="log" aria-label="SnackOverflow systemlogg">
          {baseLogs.map(([time, level, message]) => (
            <p key={time} className={`log-${level.toLowerCase()}`}>
              <span>{time}</span><b>[{level}]</b><em>{message}</em>
            </p>
          ))}
          <p className="log-muted"><span>08:41:09</span><b>[VENT]</b><em>Venter på godkjent operatør...</em></p>
        </div>
      </div>

      <form className="pin-form" onSubmit={submit}>
        <label htmlFor="snack-pin">FIRESIFRET ADGANGSKODE</label>
        <div>
          <input
            id="snack-pin"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            pattern="[0-9]{4}"
            placeholder="••••"
            value={pin}
            onChange={(event) => {
              setPin(event.target.value.replace(/\D/g, ""));
              setAttempted(false);
            }}
            aria-describedby="pin-help"
          />
          <button className="tek-primary compact" type="submit">Kjør autentisering</button>
        </div>
        <small id="pin-help">Tips: systemlogger sier mer enn de burde.</small>
      </form>

      {attempted && (
        <Feedback type={solved ? "success" : "error"}>
          {solved
            ? "SnackOverflow svarer. Kjeksens integritet er midlertidig sikret."
            : "Koden ble avvist. Dette er et skap, ikke et sted for fri improvisasjon."}
        </Feedback>
      )}

      {attempted && solved && (
        <button className="tek-primary" type="button" onClick={onSolved}>
          Åpne neste sikkerhetslag <StatusIcon name="arrow" className="h-5 w-5" />
        </button>
      )}
    </ChallengeFrame>
  );
}
