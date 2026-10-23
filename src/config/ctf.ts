/**
 * All values organizers are likely to change live in this file.
 * The challenge components should not contain copies of these values.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const ctfConfig = {
  finalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfAGo2LF7bOO9iGKtcEl-XwFeVexARlTg58qTPaQVbvrEn27w/viewform?usp=publish-editor",
  inspectPassword: "kaffekriger",
  snackOverflowPin: "1337",
  koskomLogoPath: `${basePath}/koskom.png`,
  koskomTekLogoPath: `${basePath}/koskomtek.png`,
} as const;

export const storageKey = "koskomtek-clearance-progress-v1";
