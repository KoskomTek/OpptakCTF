import Image from "next/image";
import { ctfConfig } from "@/config/ctf";
import { ChallengeFrame } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

export function ChallengeSix() {
  return (
    <ChallengeFrame
      number="06"
      eyebrow="SAK FERDIGBEHANDLET // MOT ALLE ODDS"
      title="Sikkerhetsklarering innvilget"
      intro="Alle prøver er bestått. Ingen snacks ble alvorlig skadet under prosessen. Ditt midlertidige adgangsbevis er klart."
    >
      <div className="clearance-card-wrap">
        <div className="clearance-card">
          <div className="card-topline"><span>KOSKOMTEK // KLARERING</span><span>KT–06</span></div>
          <div className="card-main">
            <div className="card-photo">
              <Image
                src={ctfConfig.koskomTekLogoPath}
                width={126}
                height={126}
                alt="KoskomTek"
              />
              <span>ABAKULE</span>
            </div>
            <dl>
              <div><dt>ORGANISASJON</dt><dd>KOSKOMTEK</dd></div>
              <div><dt>KLARERINGSNIVÅ</dt><dd>KAFFE &amp; SNACKS</dd></div>
              <div><dt>AUTORISERTE OMRÅDER</dt><dd>Kontoret, SnackOverflow</dd></div>
              <div><dt>STATUS</dt><dd className="approved-dot"><i /> GODKJENT</dd></div>
            </dl>
          </div>
          <div className="card-code" aria-hidden="true">
            <span>|||| || ||||| | |||| || | |||||</span>
            <small>KT-ABK-1337-COFFEE</small>
          </div>
        </div>
        <div className="approval-stamp" aria-label="Godkjent av KoskomTek">
          <span>APPROVED</span><strong>BY KOSKOMTEK</strong><small>✓  MYNDIGHET 042</small>
        </div>
      </div>

      <div className="final-message">
        <p>Adgangen utløper når kaffekanna er tom.</p>
        <a className="tek-primary secret-link" href={ctfConfig.finalUrl}>
          Åpne den hemmelige lenken <StatusIcon name="arrow" className="h-5 w-5" />
        </a>
      </div>
    </ChallengeFrame>
  );
}
