interface Props {
  onEnter: () => void;
}

export default function EntryOverlay({ onEnter }: Props) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.93)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{
        color: "#f0f0f0",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: "clamp(28px, 5vw, 56px)",
        letterSpacing: "0.12em",
        marginBottom: "10px",
      }}>
        MARVIN MITCHELL
      </div>

      <div style={{
        color: "#777",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: "clamp(10px, 1.4vw, 13px)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        marginBottom: "36px",
      }}>
        Lead Software Engineer · Technical Architect
      </div>

      <div style={{
        width: "40px", height: "1px",
        background: "rgba(255,255,255,0.12)",
        marginBottom: "36px",
      }} />

      <div style={{
        display: "flex", gap: "52px",
        marginBottom: "36px",
        flexWrap: "wrap", justifyContent: "center",
        padding: "0 24px",
      }}>
        {[
          { num: "12+", label: "Years" },
          { num: "5", label: "Companies" },
          { num: "30+", label: "Projects" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{
              color: "#f0f0f0",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "clamp(20px, 3.5vw, 30px)",
            }}>
              {num}
            </div>
            <div style={{
              color: "#555",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        color: "#555",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: "12px",
        maxWidth: "340px",
        textAlign: "center",
        lineHeight: "1.8",
        marginBottom: "36px",
        padding: "0 24px",
      }}>
        Building scalable systems, leading teams, and shipping products across fintech, blockchain, and digital banking. Jakarta, Indonesia.
      </div>

      <div style={{
        color: "#3a3a3a",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: "11px",
        letterSpacing: "0.1em",
        marginBottom: "20px",
      }}>
        WASD to move · mouse to look · X to view info
      </div>

      <button
        onClick={onEnter}
        style={{
          padding: "12px 48px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#f0f0f0",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "13px",
          letterSpacing: "0.2em",
          cursor: "pointer",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.65)"; }}
        onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
      >
        ENTER
      </button>
    </div>
  );
}
