// src/components/SplitText.jsx
// ReactBits-style char reveal: each character rises and settles from behind a
// baseline once the element scrolls into view. Reuses the `.rv` / `.rv-in`
// machinery from Reveal.css.

import useInView from "./useInView.js";

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0.1,
  step = 0.045,
  ...rest
}) {
  const [ref, inView] = useInView({ once: true, threshold: 0.3 });
  const chars = Array.from(text);

  return (
    <Tag
      ref={ref}
      className={`rv ${inView ? "rv-in" : ""} ${className}`.trim()}
      aria-label={text}
      {...rest}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          className="st-char"
          style={{ "--st-delay": `${delay + i * step}s` }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}
