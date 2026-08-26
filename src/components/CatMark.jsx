// src/components/CatMark.jsx
// The identity mark — the cat. Rendered as inline SVG everywhere it appears
// (nav, splash, curtain) and exported as a data URI for <img> slots like the
// profile card avatar.

export default function CatMark({ size, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M20,80 L20,40 L10,20 L40,35 L50,30 L60,35 L90,20 L80,40 L80,80 Z" />
      <circle cx="35" cy="55" r="2" fill="currentColor" stroke="none" />
      <circle cx="65" cy="55" r="2" fill="currentColor" stroke="none" />
      <path d="M50,65 L47,68 L53,68 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
