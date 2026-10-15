import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt = 'Shrishti Tomar — Software developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const paper = '#F3EEE4';
const ink = '#1C1A16';
const accent = '#E04A2C';
const marker = '#F7D046';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: paper,
          color: ink,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 4, opacity: 0.6 }}>
          <span>PORTFOLIO — ED. 2026</span>
          <span>DELHI, IN</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Shrishti Tomar<span style={{ color: accent }}>.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 40, opacity: 0.75 }}>
            Backend & full-stack systems: job queues, RAG, real-time.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: 999,
              backgroundColor: ink,
              color: paper,
              fontSize: 26,
            }}
          >
            Open to SDE internships
          </div>
          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: 999,
              backgroundColor: marker,
              fontSize: 26,
            }}
          >
            Node.js · Redis · PostgreSQL · Docker
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
