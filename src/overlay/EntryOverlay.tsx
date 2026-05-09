interface Props {
  onEnter: () => void;
  progress: number;
}

export default function EntryOverlay({ onEnter, progress }: Props) {
  const loading = progress === 100 ? false : true;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src="./profile.webp"
        alt="Marvin Mitchell"
        style={{
          width: "144px",
          height: "144px",
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center center",
          marginBottom: "55px",
        }}
      />

      <div
        style={{
          color: "#f0f0f0",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "clamp(28px, 5vw, 56px)",
          letterSpacing: "0.12em",
          marginBottom: "10px",
        }}
      >
        MARVIN MITCHELL
      </div>

      <div
        style={{
          color: "#777",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "clamp(10px, 1.4vw, 13px)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: "36px",
        }}
      >
        Lead Software Engineer · Technical Architect
      </div>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "rgba(255,255,255,0.12)",
          marginBottom: "36px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "52px",
          marginBottom: "36px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        {[
          { num: "12+", label: "Years" },
          { num: "5", label: "Companies" },
          { num: "30+", label: "Projects" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#f0f0f0",
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "clamp(20px, 3.5vw, 30px)",
              }}
            >
              {num}
            </div>
            <div
              style={{
                color: "#555",
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          color: "#555",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "12px",
          maxWidth: "340px",
          textAlign: "center",
          lineHeight: "1.8",
          marginBottom: "36px",
          padding: "0 24px",
        }}
      >
        Building scalable systems, leading teams, and shipping products across
        fintech, blockchain, and digital banking. Jakarta, Indonesia.
      </div>

      <div
        style={{
          color: "#3a3a3a",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "11px",
          letterSpacing: "0.1em",
          marginBottom: "20px",
        }}
      >
        WASD to move · mouse to look · X to view info
      </div>

      <div
        style={{
          width: "200px",
          height: "1px",
          background: "rgba(241, 130, 130, 0.07)",
          marginBottom: "20px",
          overflow: "hidden",
          opacity: 1,
          transition: "opacity 0.4s",
          textAlign: "left",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#555",
            transition: "width .75s ease-out",
          }}
        />
      </div>

      <button
        onClick={loading ? undefined : onEnter}
        disabled={loading}
        style={{
          padding: "12px 48px",
          background: "transparent",
          border: `1px solid ${loading ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.18)"}`,
          color: loading ? "#3a3a3a" : "#f0f0f0",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "13px",
          letterSpacing: "0.2em",
          cursor: loading ? "default" : "pointer",
          transition: "border-color 0.2s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          if (!loading)
            (e.target as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.65)";
        }}
        onMouseLeave={(e) => {
          if (!loading)
            (e.target as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.18)";
        }}
      >
        {loading ? `LOADING...` : "ENTER"}
      </button>
    </div>
  );
}
