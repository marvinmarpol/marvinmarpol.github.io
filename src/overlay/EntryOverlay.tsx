interface Props {
  onEnter: () => void;
}

export default function EntryOverlay({ onEnter }: Props) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "16px",
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ color: "#f0f0f0", fontFamily: "Georgia, serif", fontSize: "28px", letterSpacing: "0.15em" }}>
        MY PORTFOLIO
      </div>
      <div style={{ color: "#888", fontFamily: "sans-serif", fontSize: "13px", marginBottom: "8px" }}>
        Use <strong style={{ color: "#bbb" }}>WASD</strong> to move · <strong style={{ color: "#bbb" }}>mouse</strong> to look · <strong style={{ color: "#bbb" }}>X</strong> to view info
      </div>
      <button
        onClick={onEnter}
        style={{
          padding: "10px 36px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "#f0f0f0",
          fontFamily: "Georgia, serif",
          fontSize: "14px",
          letterSpacing: "0.12em",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "#f0f0f0"; }}
        onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)"; }}
      >
        ENTER
      </button>
    </div>
  );
}
