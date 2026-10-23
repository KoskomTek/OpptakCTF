"use client";

import { type DragEvent, useState } from "react";
import { ChallengeFrame, Feedback } from "./ChallengeFrame";
import { StatusIcon } from "../StatusIcon";

type ProtocolId = "coffee" | "snacks" | "work";

const actions: Record<ProtocolId, { title: string; detail: string }> = {
  coffee: { title: "Fyll kaffemaskinen.", detail: "Gjenopprett primær energiforsyning" },
  snacks: { title: "Etterfyll SnackOverflow.", detail: "Stabiliser blodsukkerberedskap" },
  work: { title: "Lat som du jobber.", detail: "Oppretthold plausibel produktivitet" },
};

const correctOrder: ProtocolId[] = ["coffee", "snacks", "work"];

export function ChallengeFive({ onSolved }: { onSolved: () => void }) {
  const [items, setItems] = useState<ProtocolId[]>(["work", "coffee", "snacks"]);
  const [dragged, setDragged] = useState<ProtocolId>();
  const [checked, setChecked] = useState(false);
  const solved = correctOrder.every((id, index) => id === items[index]);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setChecked(false);
  };

  const drop = (event: DragEvent<HTMLLIElement>, targetId: ProtocolId) => {
    event.preventDefault();
    if (!dragged || dragged === targetId) return;
    const next = [...items];
    const from = next.indexOf(dragged);
    const to = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragged);
    setItems(next);
    setDragged(undefined);
    setChecked(false);
  };

  return (
    <ChallengeFrame
      number="05"
      eyebrow="BEREDSKAPSNIVÅ: SMULE"
      title="Nødprotokoll"
      intro="Total systemsvikt er nært forestående. Plasser handlingene i korrekt rekkefølge. Dra kortene, eller bruk pilknappene — panikk er valgfritt."
    >
      <ol className="protocol-list" aria-label="Handlinger i prioritert rekkefølge">
        {items.map((id, index) => (
          <li
            key={id}
            draggable
            onDragStart={() => setDragged(id)}
            onDragEnd={() => setDragged(undefined)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => drop(event, id)}
            className={dragged === id ? "is-dragging" : ""}
          >
            <span className="protocol-rank">{String(index + 1).padStart(2, "0")}</span>
            <span className="drag-handle" aria-hidden="true">⠿</span>
            <div><strong>{actions[id].title}</strong><small>{actions[id].detail}</small></div>
            <div className="order-buttons">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Flytt «${actions[id].title}» opp`}
              >
                <StatusIcon name="chevronUp" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label={`Flytt «${actions[id].title}» ned`}
              >
                <StatusIcon name="chevronDown" className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ol>

      <button className="tek-primary" type="button" onClick={() => setChecked(true)}>
        Kjør nødprotokoll
      </button>

      {checked && (
        <Feedback type={solved ? "success" : "error"}>
          {solved
            ? "SYSTEM RESTORED. KOSKOMTEK APPROVES."
            : "Feil prioritering. Man kan ikke late som man jobber uten kaffe. Det ser mistenkelig ut."}
        </Feedback>
      )}

      {checked && solved && (
        <button className="tek-primary final-step" type="button" onClick={onSolved}>
          Be om endelig klarering <StatusIcon name="shield" className="h-5 w-5" />
        </button>
      )}
    </ChallengeFrame>
  );
}
