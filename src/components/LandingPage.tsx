import Image from "next/image";
import { ctfConfig } from "@/config/ctf";
import { StatusIcon } from "./StatusIcon";

export function LandingPage({ onExplore }: { onExplore: () => void }) {
  return (
    <main className="landing-shell min-h-screen overflow-hidden">
      <nav className="landing-nav" aria-label="Hovedmeny">
        <a className="landing-brand" href="#topp" aria-label="Koskom, til toppen">
          <Image
            src={ctfConfig.koskomLogoPath}
            width={42}
            height={42}
            alt="Koskom-logo"
            priority
          />
          <span>KOSKOM</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-[#5d5a55] md:flex">
          <a href="#om">Om oss</a>
          <a href="#tilbud">På kontoret</a>
          <span className="landing-status"><i /> Kaffestatus: Operativ</span>
        </div>
      </nav>

      <section id="topp" className="landing-hero">
        <div className="landing-copy">
          <p className="landing-eyebrow">Kontor- og Sosialkomiteen</p>
          <h1>
            Litt bedre dager
            <span>på Abakus-kontoret.</span>
          </h1>
          <p className="landing-intro">
            Vi sørger for gratis kaffe, velfylte snackshyller og sosiale
            arrangementer for alle Abakus-studenter. Kom innom — døra er åpen,
            kaffen er varm.
          </p>
          <button className="landing-cta" type="button" onClick={onExplore}>
            Utforsk Koskom
            <StatusIcon name="arrow" className="h-5 w-5" />
          </button>
          <p className="landing-footnote">
            Ingen påmelding. Ingen dresskode. Moderat kaffekø.
          </p>
        </div>

        <div className="landing-visual" aria-label="Koskom-logo og nøkkeltall">
          <div className="landing-orbit orbit-one" />
          <div className="landing-orbit orbit-two" />
          <div className="logo-card">
            <span className="logo-card-label">SIDEN 2002</span>
            <Image
              src={ctfConfig.koskomLogoPath}
              width={225}
              height={225}
              alt="Koskom sin røde kaffekopp-logo"
              priority
            />
            <div className="logo-card-caption">
              <span>Påfyll</span>
              <strong>hele uka</strong>
            </div>
          </div>
          <div className="floating-note note-top">
            <StatusIcon name="coffee" className="h-5 w-5" />
            <span><strong>Gratis kaffe</strong>Som den skal være</span>
          </div>
          <div className="floating-note note-bottom">
            <span className="note-dot" />
            <span><strong>Kontoret er åpent</strong>Stikk innom!</span>
          </div>
        </div>
      </section>

      <section id="tilbud" className="landing-features">
        <article>
          <span>01</span>
          <h2>Kaffe på huset</h2>
          <p>Drivstoff for både forelesning og deadline.</p>
        </article>
        <article>
          <span>02</span>
          <h2>SnackOverflow</h2>
          <p>Små pauser. Store mengder kjeks.</p>
        </article>
        <article id="om">
          <span>03</span>
          <h2>Sosialt påfyll</h2>
          <p>Lav terskel, høy trivselsfaktor.</p>
        </article>
      </section>
    </main>
  );
}
