import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Altus Media Labs — Where strategy meets execution";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#181818",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "#2b59d1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            A
          </div>
          <span style={{ color: "#ffffff", fontSize: "32px", fontWeight: 600 }}>
            Altus Media Labs
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: "#a6472b",
              fontSize: "20px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Growth & Automation Agency
          </span>
          <div
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Where strategy meets execution.
          </div>
          <div
            style={{
              color: "#cecaca",
              fontSize: "24px",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Brand, web, marketing, and automation connected around your business
            goals.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#64615e",
            fontSize: "20px",
          }}
        >
          <span>altusmedialabs.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

