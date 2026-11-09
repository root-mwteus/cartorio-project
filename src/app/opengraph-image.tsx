import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

const place = `${siteConfig.address.city} — ${siteConfig.address.state}`

export const alt = `Registro de Imóveis de ${siteConfig.address.city}, ${siteConfig.address.state}. CNS ${siteConfig.cns}.`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const PAPER = '#faf6ee'
const GOLD = '#cda454'
const WINE_DEEP = '#460913'

export default async function Image() {
  const [regular, semibold, logo] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/_og/lora-400.ttf')),
    readFile(join(process.cwd(), 'src/app/_og/lora-600.ttf')),
    readFile(join(process.cwd(), 'public/logo-icon-v3.png')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: WINE_DEEP,
          color: PAPER,
          fontFamily: 'Lora',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 680 }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                padding: '12px 0',
                borderTop: `3px solid ${GOLD}`,
                borderBottom: `3px solid ${GOLD}`,
                color: GOLD,
                fontSize: 22,
                letterSpacing: 3,
              }}
            >
              SERVIÇO PÚBLICO DELEGADO • FÉ PÚBLICA
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 82,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: -1,
            }}
          >
            <div>Registro de</div>
            <div>Imóveis de</div>
            <div>{siteConfig.address.city}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', fontSize: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={`data:image/png;base64,${logo.toString('base64')}`}
              width={58}
              height={56}
              style={{ marginRight: 20 }}
            />
            CNS {siteConfig.cns} · {place}
          </div>
        </div>

        <svg width="360" height="502" viewBox="0 0 420 586" style={{ alignSelf: 'center' }}>
          <g transform="translate(0 130)" stroke={GOLD} fill="none" strokeWidth="2.5">
            <polygon points="20,190 190,60 400,160 235,320" fill="rgba(250,246,238,0.05)" />
            <polyline points="20,190 20,206 235,336 400,176 400,160" strokeOpacity="0.55" />
            <line x1="235" y1="320" x2="235" y2="336" strokeOpacity="0.55" />
            <polygon points="125,170 225,215 225,262 125,217" fill="rgba(250,246,238,0.16)" />
            <polygon points="225,215 290,160 290,207 225,262" fill="rgba(250,246,238,0.07)" />
            <polygon points="125,170 190,115 290,160 225,215" fill="rgba(250,246,238,0.26)" />
            {[
              [20, 190],
              [190, 60],
              [400, 160],
              [235, 320],
            ].map(([cx, cy]) => (
              <circle key={cx} cx={cx} cy={cy} r="6" fill={GOLD} />
            ))}
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Lora', data: regular, weight: 400, style: 'normal' },
        { name: 'Lora', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  )
}
