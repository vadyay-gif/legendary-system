import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Ready — Stop Guessing. Start Controlling AI.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050b19",
          color: "white",
          padding: "68px 78px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(34,211,238,0.18)",
            filter: "blur(90px)",
            right: -80,
            top: -180,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "rgba(124,58,237,0.22)",
            filter: "blur(90px)",
            left: -160,
            bottom: -180,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.4,
            }}
          >
            AI Ready
          </div>

          <div
            style={{
              marginTop: 78,
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2.8,
            }}
          >
            <div>STOP GUESSING.</div>
            <div>START CONTROLLING AI.</div>
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              maxWidth: 860,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#cbd5e1",
            }}
          >
            Practice on real AI situations. See what changes the result and build
            the judgement to use AI deliberately.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
