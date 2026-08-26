// src/components/BrandMarks.jsx
// Brand marks for networking vendors that have no icon in react-icons or
// simple-icons (Aruba Networks, WhatsUp Gold, Mimosa Networks). Drawn as
// clean monochrome monograms in the same geometric style as the brand icons,
// inheriting `currentColor` so they follow the monochrome theme.

// Aruba Networks — bold geometric "A"
export function ArubaMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.6 2.4 20.4h4.5l1.6-3.4h7l1.6 3.4h4.5L12 3.6Z" />
    </svg>
  );
}

// WhatsUp Gold — bold "W" with an up-arrow (the "up" in the name / uptime)
export function WhatsUpGoldMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.8 20.4 6 6l6 8.6L18 6l3.2 14.4h-3.5l-1.4-7.2L12 18.4 7.7 13.2l-1.4 7.2H2.8Z" />
      <path
        d="M18.4 1.4v5.2M16 4.2l2.4 2.4 2.4-2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Mimosa Networks — bold "M" with a wireless signal arc
export function MimosaMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.6 20.4V6h3.8L12 12.6 17.6 6h3.8v14.4h-3.4v-8.6L12 17.8 6 11.8v8.6H2.6Z" />
      <path
        d="M15.6 1.8a4.4 4.4 0 0 1 4.4 4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
