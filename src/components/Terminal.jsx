// src/components/Terminal.jsx
// The hero's personality piece: a fake terminal that types commands by
// itself, answers, then cycles to the next one — like a live session.
// Monochrome, respects prefers-reduced-motion, loops forever.

import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import "./Terminal.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Terminal({ className = "" }) {
  const { t } = useLang();
  const lines = t.hero.terminal.lines;
  const bodyRef = useRef(null);
  // stable flag (lazy initializer) — the new react-hooks rules forbid reading
  // refs during render, so this lives in state instead of a ref
  const [reduceMotion] = useState(prefersReducedMotion);

  // reduced motion: everything visible at once, no typing
  const [history, setHistory] = useState(() =>
    reduceMotion ? lines.map((l) => ({ cmd: l.cmd, out: l.out })) : []
  );
  const [typing, setTyping] = useState(
    reduceMotion ? null : { idx: 0, text: "", showOut: false }
  );

  useEffect(() => {
    if (reduceMotion || !typing) return undefined;
    const line = lines[typing.idx % lines.length];
    let timer;
    if (typing.text.length < line.cmd.length) {
      // keep typing the current command
      timer = setTimeout(
        () =>
          setTyping({
            idx: typing.idx,
            text: line.cmd.slice(0, typing.text.length + 1),
            showOut: false,
          }),
        62
      );
    } else if (!typing.showOut) {
      // brief pause, then reveal the output
      timer = setTimeout(
        () => setTyping({ idx: typing.idx, text: typing.text, showOut: true }),
        280
      );
    } else {
      // hold the answer, then move to the next command
      timer = setTimeout(() => {
        // cap the log so the terminal stays cheap during long sessions
        setHistory((h) => [...h, { cmd: line.cmd, out: line.out }].slice(-16));
        setTyping({ idx: typing.idx + 1, text: "", showOut: false });
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [typing, lines, reduceMotion]);

  // keep the newest lines in view
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, typing]);

  const current = typing ? lines[typing.idx % lines.length] : null;

  return (
    <div className={`term ${className}`.trim()} aria-hidden="true">
      <div className="term-bar">
        <span className="term-dot d1" aria-hidden="true" />
        <span className="term-dot d2" aria-hidden="true" />
        <span className="term-dot d3" aria-hidden="true" />
        <span className="term-title">{t.hero.terminal.title}</span>
      </div>

      <div className="term-body" ref={bodyRef}>
        {history.map((l, i) => (
          <div className="term-line" key={i}>
            <p className="term-cmd">
              <span className="term-prompt" aria-hidden="true">❯</span> {l.cmd}
            </p>
            {l.out.map((o, j) => (
              <p className="term-out" key={j}>{o}</p>
            ))}
          </div>
        ))}

        {typing && current && (
          <div className="term-line">
            <p className="term-cmd">
              <span className="term-prompt" aria-hidden="true">❯</span> {typing.text}
              <span className="term-caret" aria-hidden="true" />
            </p>
            {typing.showOut &&
              current.out.map((o, j) => (
                <p className="term-out" key={j}>{o}</p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
