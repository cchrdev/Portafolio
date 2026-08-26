// src/components/Reveal.jsx
// Scroll-reveal system in the style of the reference project:
//  - Reveal: fades/rises text, or reveals it word-by-word behind masks
//  - SectionHeading: numbered editorial heading (eyebrow + title + rule)
// Everything is plain CSS transitions driven by a .rv-in class.
// (The useInView hook lives in useInView.js so this file only exports components.)

import useInView from "./useInView.js";
import "./Reveal.css";

/**
 * Reveal — animates its content when scrolled into view.
 * Pass a string as children to get the word-mask reveal (words rise one by
 * one from behind clipped lines). Pass JSX to animate the node as a whole.
 */
export default function Reveal({
  children,
  as: Tag = "p",
  className = "",
  direction = "up",
  delay = 0,
  stagger = 26,
  once = true,
  ...rest
}) {
  const [ref, inView] = useInView({ once });
  const cls = `rv ${inView ? "rv-in" : ""} ${className}`.trim();

  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <Tag ref={ref} data-rv={direction} className={cls} {...rest}>
        {/* each word sits in its own mask, with a real space between masks
            so wrapped text keeps its spaces (inline-block masks collapse
            whitespace otherwise) */}
        {words.flatMap((word, i) => [
          <span key={`${word}-${i}`} className="word-mask">
            <span className="word" style={{ "--word-delay": `${delay + i * stagger}ms` }}>
              {word}
            </span>
          </span>,
          " ",
        ])}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} data-rv={direction} className={cls} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * SectionHeading — the chapter opener:
 *   ABOUT ──────── TITLE ────────
 */
export function SectionHeading({ eyebrow, title, tagline, className = "" }) {
  return (
    <header className={`sec-head ${className}`.trim()}>
      <Reveal as="span" className="k" direction="fade" delay={80}>
        {eyebrow}
      </Reveal>
      <Reveal as="h2" className="h-sec display" stagger={18}>
        {title}
      </Reveal>
      {tagline ? <Reveal as="p" className="sec-tagline">{tagline}</Reveal> : null}
      <span className="rule" aria-hidden="true" />
    </header>
  );
}
