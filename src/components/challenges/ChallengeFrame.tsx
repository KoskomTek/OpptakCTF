import type { ReactNode } from "react";

export function ChallengeFrame({
  number,
  eyebrow,
  title,
  intro,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="challenge-wrap">
      <div className="challenge-heading">
        <div className="challenge-number" aria-hidden="true">{number}</div>
        <div>
          <p>{eyebrow}</p>
          <h1 id="challenge-title">{title}</h1>
          <div className="heading-rule"><i /></div>
        </div>
      </div>
      <p className="challenge-intro">{intro}</p>
      {children}
    </div>
  );
}

export function Feedback({
  type,
  children,
}: {
  type: "error" | "success" | "info";
  children: ReactNode;
}) {
  return (
    <div className={`challenge-feedback ${type}`} role="status" aria-live="polite">
      <span aria-hidden="true">{type === "success" ? "✓" : type === "error" ? "!" : "i"}</span>
      <p>{children}</p>
    </div>
  );
}
