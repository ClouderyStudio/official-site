<script setup lang="ts">
/**
 * LineCursor — a spring-line ribbon that trails the pointer, ported from the
 * legacy site's SleekLineCursor. It draws on a fixed, pointer-transparent canvas
 * and is only mounted for fine pointers. The ribbon colour is derived from the
 * current --md-sys-color-primary, so it follows the theme instead of cycling
 * arbitrary hues. Under prefers-reduced-motion the ribbon is trimmed (fewer
 * trails) rather than removed.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const NODES_PER_LINE = 50
const FRICTION = 0.5
const DAMPENING = 0.25
const TENSION = 0.98
const AMPLITUDE = 46
const FREQUENCY = 0.0016

/** Hue (degrees) of the current primary role, so the ribbon stays on-brand. */
function primaryHue(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--md-sys-color-primary')
    .trim()
  let r = 0
  let g = 0
  let b = 0

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(raw)?.[1]
  if (hex) {
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex
    r = parseInt(full.slice(0, 2), 16) / 255
    g = parseInt(full.slice(2, 4), 16) / 255
    b = parseInt(full.slice(4, 6), 16) / 255
  } else {
    const parts = raw.match(/[\d.]+/g)
    if (!parts || parts.length < 3) return 217
    r = Number(parts[0]) / 255
    g = Number(parts[1]) / 255
    b = Number(parts[2]) / 255
  }

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d === 0) return 217

  let h = 0
  if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  h *= 60
  return h < 0 ? h + 360 : h
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const trailCount = reduced ? 8 : 18
  const hue = primaryHue()

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const view = { w: window.innerWidth, h: window.innerHeight, dpr: 1 }
  let frame = 0
  let phase = Math.random() * Math.PI * 2

  class Line {
    spring: number
    friction: number
    nodes: Node[]

    constructor(spring: number) {
      this.spring = spring + 0.1 * Math.random() - 0.02
      this.friction = FRICTION + 0.01 * Math.random() - 0.002
      this.nodes = Array.from({ length: NODES_PER_LINE }, () => ({
        x: pos.x,
        y: pos.y,
        vx: 0,
        vy: 0,
      }))
    }

    update(): void {
      let spring = this.spring
      let head = this.nodes[0]

      head.vx += (pos.x - head.x) * spring
      head.vy += (pos.y - head.y) * spring

      for (let i = 0; i < this.nodes.length; i++) {
        head = this.nodes[i]
        if (i > 0) {
          const prev = this.nodes[i - 1]
          head.vx += (prev.x - head.x) * spring
          head.vy += (prev.y - head.y) * spring
          head.vx += prev.vx * DAMPENING
          head.vy += prev.vy * DAMPENING
        }
        head.vx *= this.friction
        head.vy *= this.friction
        head.x += head.vx
        head.y += head.vy
        spring *= TENSION
      }
    }

    draw(c: CanvasRenderingContext2D): void {
      const last = this.nodes.length - 1
      c.beginPath()
      c.moveTo(this.nodes[0].x, this.nodes[0].y)

      for (let i = 1; i < last - 1; i++) {
        const a = this.nodes[i]
        const b = this.nodes[i + 1]
        c.quadraticCurveTo(a.x, a.y, 0.5 * (a.x + b.x), 0.5 * (a.y + b.y))
      }

      c.quadraticCurveTo(this.nodes[last - 1].x, this.nodes[last - 1].y, this.nodes[last].x, this.nodes[last].y)
      c.stroke()
      c.closePath()
    }
  }

  const lines = Array.from({ length: trailCount }, (_, i) => new Line(0.4 + (i / trailCount) * 0.025))

  function resize(): void {
    view.dpr = Math.min(window.devicePixelRatio || 1, 2)
    view.w = window.innerWidth
    view.h = window.innerHeight
    canvas!.width = Math.max(1, Math.floor(view.w * view.dpr))
    canvas!.height = Math.max(1, Math.floor(view.h * view.dpr))
  }

  function render(): void {
    frame = requestAnimationFrame(render)
    if (document.hidden) return

    ctx!.setTransform(view.dpr, 0, 0, view.dpr, 0, 0)
    ctx!.globalCompositeOperation = 'source-over'
    ctx!.clearRect(0, 0, view.w, view.h)
    ctx!.globalCompositeOperation = 'lighter'

    phase += FREQUENCY
    ctx!.strokeStyle = `hsla(${Math.round(hue + Math.sin(phase) * AMPLITUDE)}, 68%, 58%, 0.22)`
    ctx!.lineWidth = 1

    for (const line of lines) {
      line.update()
      line.draw(ctx!)
    }
  }

  function onPointerMove(event: PointerEvent): void {
    pos.x = event.clientX
    pos.y = event.clientY
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  frame = requestAnimationFrame(render)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="line-cursor" aria-hidden="true" />
</template>

<style scoped>
.line-cursor {
  position: fixed;
  inset: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  pointer-events: none;
  contain: strict;
}
</style>
