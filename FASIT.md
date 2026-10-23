# Fasit — KoskomTek Takeover

Dette dokumentet beskriver hvordan hele CTF-opplevelsen løses. Verdier som PIN-kode, passord og sluttlenke styres fra `src/config/ctf.ts`.

## Start: Koskom blir overtatt

1. Trykk på **Utforsk Koskom →** på den vanlige Koskom-siden.
2. Vent til KoskomTek-sekvensen er ferdig, eller trykk **Hopp over intro**.

## Oppgave 1: Kaffeautentisering

**Riktig svar:** `Gratis kaffe`

Velg «Gratis kaffe» som den viktigste ressursen på Abakus-kontoret. Trykk deretter på knappen for å gå videre.

## Oppgave 2: SnackOverflow

**Riktig kode:** `1337`

Les terminalteksten. Linjen merket `[AUTH]` viser den midlertidige adgangskoden:

```text
Midlertidig adgangskode generert: 1337
```

Skriv `1337` i kodefeltet og kjør autentiseringen.

## Oppgave 3: Sannhetsfilteret

**Riktig svar:** `Skap A`

Premisset sier at nøkkelkortet ligger i ett skap, og at nøyaktig én av disse påstandene er sann:

- Skap A: «Nøkkelkortet ligger i skap B.»
- Skap B: «Nøkkelkortet ligger ikke i skap B.»
- Skap C: «Nøkkelkortet ligger ikke i skap A.»

Test av alternativene:

| Kortets plassering | Påstand A | Påstand B | Påstand C | Antall sanne |
| --- | --- | --- | --- | --- |
| Skap A | Usann | Sann | Usann | **1** |
| Skap B | Sann | Usann | Sann | 2 |
| Skap C | Usann | Sann | Sann | 2 |

Bare skap A oppfyller kravet om nøyaktig én sann påstand.

## Oppgave 4: Inspect Element

**Riktig passord:** `kaffekriger`

1. Finn boksen merket **HTML-ARTEFAKT / PASSORDLAGER_04**.
2. Høyreklikk på boksen og velg **Inspiser**, eller åpne utviklerverktøy med `F12` / `Fn + F12`.
3. Finn HTML-elementet for boksen.
4. Passordet finnes både i attributtet `data-koskomtek-secret-password` og i HTML-kommentaren:

```html
<!-- KOSKOMTEK_SECRET_PASSWORD: kaffekriger -->
```

Skriv `kaffekriger` i passordfeltet og trykk **Verifiser**.

## Oppgave 5: Nødprotokoll

**Riktig rekkefølge:**

1. Fyll kaffemaskinen.
2. Etterfyll SnackOverflow.
3. Lat som du jobber.

Dra handlingene i riktig rekkefølge, eller bruk pilknappene. Trykk deretter **Kjør nødprotokoll**.

## Oppgave 6: Sikkerhetsklarering

Når de fem foregående oppgavene er løst, vises klareringskortet automatisk. Trykk **Åpne den hemmelige lenken →** for å gå til adressen som er satt som `finalUrl` i konfigurasjonen.

## Konfigurerbare svar

Disse verdiene kan endres i `src/config/ctf.ts` uten å redigere oppgavekomponentene:

- `snackOverflowPin` — koden i oppgave 2.
- `inspectPassword` — passordet i oppgave 4.
- `finalUrl` — lenken på sluttsiden.
- `koskomLogoPath` og `koskomTekLogoPath` — logofilene.

Hvis PIN-koden eller passordet endres, må denne fasiten oppdateres tilsvarende.
