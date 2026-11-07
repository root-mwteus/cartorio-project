'use client'

import { useEffect, useRef } from 'react'
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  Shape,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

// Cores da paleta (globals.css), em hex porque o three não lê variáveis CSS.
const PAPER = '#faf6ee'
const LINEN = '#f3ece0'
const GOLD = '#cda454'
const WINE_DEEP = '#460913'
// Papel misturado com 12% de vinho-profundo: ilumina as faces em sombra.
const SHADOW_TINT = '#e4dad4'

const SLAB_HEIGHT = 0.35
// Lote levemente irregular, como os lotes reais (x, z).
const LOT: [number, number][] = [
  [-5, 3.4],
  [5.2, 3],
  [4.6, -3.6],
  [-4.8, -3.2],
]

// Sol à esquerda da câmera (que está em ~52°): ilumina as faces visíveis de frente
// e joga as sombras para trás e para a direita, sobre o próprio lote.
const BASE_AZIMUTH = 112
const BASE_ELEVATION = 24
const SWEEP_FROM = -40
const SWEEP_MS = 1200

const toRad = (deg: number) => (deg * Math.PI) / 180

function buildScene() {
  const scene = new Scene()
  const disposables: { dispose: () => void }[] = []
  const add = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item)
    return item
  }

  const linen = add(new MeshStandardMaterial({ color: LINEN, roughness: 0.95 }))
  const lime = add(new MeshStandardMaterial({ color: PAPER, roughness: 0.9 }))
  const brass = add(new MeshStandardMaterial({ color: GOLD, roughness: 0.45, metalness: 0.15 }))

  const mesh = (geometry: BoxGeometry | CylinderGeometry | ExtrudeGeometry, material: MeshStandardMaterial) => {
    const m = new Mesh(add(geometry), material)
    m.castShadow = true
    m.receiveShadow = true
    scene.add(m)
    return m
  }

  // Terreno: o polígono do lote extrudado. A forma é desenhada em (x, -z) porque
  // rotateX(-90°) leva o eixo y da forma para -z.
  const shape = new Shape(LOT.map(([x, z]) => new Vector2(x, -z)))
  const slab = new ExtrudeGeometry(shape, { depth: SLAB_HEIGHT, bevelEnabled: false })
  slab.rotateX(-Math.PI / 2)
  mesh(slab, linen)

  // Filete de latão e marcos de divisa nos vértices, um pouco para dentro da borda.
  const cx = LOT.reduce((s, [x]) => s + x, 0) / LOT.length
  const cz = LOT.reduce((s, [, z]) => s + z, 0) / LOT.length
  const inset = LOT.map(([x, z]) => new Vector3(cx + (x - cx) * 0.93, SLAB_HEIGHT, cz + (z - cz) * 0.93))
  inset.forEach((a, i) => {
    const b = inset[(i + 1) % inset.length]
    const length = a.distanceTo(b)
    const strip = mesh(new BoxGeometry(length, 0.025, 0.06), brass)
    strip.position.set((a.x + b.x) / 2, SLAB_HEIGHT + 0.012, (a.z + b.z) / 2)
    strip.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x)
    const marker = mesh(new CylinderGeometry(0.09, 0.09, 0.2, 16), brass)
    marker.position.set(a.x, SLAB_HEIGHT + 0.1, a.z)
  })

  // Edificação em cal: volume principal com laje em balanço e uma ala térrea.
  const main = mesh(new BoxGeometry(3.2, 1.6, 2.2), lime)
  main.position.set(0.9, SLAB_HEIGHT + 0.8, -0.4)
  const roof = mesh(new BoxGeometry(3.3, 0.09, 2.7), lime)
  roof.position.set(0.9, SLAB_HEIGHT + 1.645, -0.4)
  const wing = mesh(new BoxGeometry(2, 0.85, 1.7), lime)
  wing.position.set(-1.6, SLAB_HEIGHT + 0.425, 0.25)

  // Chão invisível que só recebe a sombra, tingida de vinho-profundo.
  const ground = new Mesh(
    add(new PlaneGeometry(60, 60)),
    add(new ShadowMaterial({ color: new Color(WINE_DEEP), opacity: 0.12 })),
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  scene.add(new HemisphereLight(SHADOW_TINT, WINE_DEEP, 1.7))

  const sun = new DirectionalLight('#fff3df', 2.4)
  sun.castShadow = true
  sun.shadow.camera.left = -9
  sun.shadow.camera.right = 9
  sun.shadow.camera.top = 9
  sun.shadow.camera.bottom = -9
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 60
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.02
  scene.add(sun, sun.target)

  return { scene, sun, dispose: () => disposables.forEach((d) => d.dispose()) }
}

export default function LotCanvas({ onReady }: { onReady: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return // sem WebGL: o pôster continua visível
    }

    const coarse = matchMedia('(pointer: coarse)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.5))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFShadowMap
    host.appendChild(renderer.domElement)

    const { scene, sun, dispose } = buildScene()
    const shadowSize = coarse ? 512 : 1024
    sun.shadow.mapSize.set(shadowSize, shadowSize)

    // Axonometria: câmera ortográfica fixa, como um desenho técnico. Alvo e VIEW
    // enquadram placa, edifício e sombra numa caixa 16:9; se mudar, recalcule os
    // rótulos de hero-lot.tsx e o pôster.
    const camera = new OrthographicCamera()
    camera.position.set(15.01, 16.33, 17.36)
    camera.lookAt(1.01, 0.33, -0.64)
    const VIEW = 4.39

    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      const aspect = width / height
      camera.left = -VIEW * aspect
      camera.right = VIEW * aspect
      camera.top = VIEW
      camera.bottom = -VIEW
      camera.near = 0.1
      camera.far = 100
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      requestRender()
    }

    // Luz: varredura de entrada e depois segue o ponteiro com amortecimento.
    const light = { azimuth: SWEEP_FROM, elevation: 0, targetAzimuth: 0, targetElevation: 0 }
    const placeSun = () => {
      const az = toRad(BASE_AZIMUTH + light.azimuth)
      const el = toRad(BASE_ELEVATION + light.elevation)
      sun.position.set(Math.cos(el) * Math.cos(az) * 25, Math.sin(el) * 25, Math.cos(el) * Math.sin(az) * 25)
    }

    let frame = 0
    let visible = true
    let last = 0
    let sweepStart = 0
    let ready = false

    const tick = (now: number) => {
      frame = 0
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016
      last = now
      let moving: boolean

      if (sweepStart === 0) sweepStart = now
      const t = Math.min((now - sweepStart) / SWEEP_MS, 1)
      if (t < 1) {
        light.azimuth = SWEEP_FROM * (1 - t) ** 3
        moving = true
      } else {
        const k = 1 - Math.exp(-dt * 6)
        light.azimuth += (light.targetAzimuth - light.azimuth) * k
        light.elevation += (light.targetElevation - light.elevation) * k
        moving =
          Math.abs(light.targetAzimuth - light.azimuth) > 0.02 ||
          Math.abs(light.targetElevation - light.elevation) > 0.02
      }

      placeSun()
      renderer.render(scene, camera)
      if (!ready) {
        ready = true
        onReadyRef.current()
      }
      if (moving) requestRender()
      else last = 0
    }

    function requestRender() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick)
    }

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      light.targetAzimuth = ((event.clientX / window.innerWidth) * 2 - 1) * 15
      light.targetElevation = -((event.clientY / window.innerHeight) * 2 - 1) * 4
      requestRender()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) requestRender()
      else if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
        last = 0
      }
    })
    io.observe(host)
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const onVisibility = () => requestRender()
    document.addEventListener('visibilitychange', onVisibility)
    if (!coarse) window.addEventListener('pointermove', onPointer, { passive: true })
    resize()

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" />
}
