// src/components/Aurora.jsx
// ReactBits-style Aurora, kept in the site's monochrome family: soft neutral
// glows drift slowly behind everything. Pure CSS (no canvas, no WebGL), low
// opacity so it never competes with the content.

import "./Aurora.css";

export default function Aurora({ className = "" }) {
  return (
    <div className={`aurora ${className}`.trim()} aria-hidden="true">
      <div className="aurora-blob a1" />
      <div className="aurora-blob a2" />
      <div className="aurora-blob a3" />
      <div className="aurora-blob a4" />
    </div>
  );
}
