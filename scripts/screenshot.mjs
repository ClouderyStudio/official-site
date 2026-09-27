/**
 * Visual verification harness.
 *
 * Renders the built site with a local Chromium (Edge or Chrome) over the
 * DevTools protocol and writes PNGs to .review/: full-page captures for every
 * viewport in the matrix, one clip per page section, plus the open mega-menu and
 * the open mobile drawer.
 *
 * Usage:
 *   pnpm preview                     # serve dist/ on http://127.0.0.1:4173
 *   node scripts/screenshot.mjs      # or: pnpm shots
 *
 * Options: --url=<url> --out=<dir> --theme=light|dark|both --only=<name>
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const args = new Map(
  process.argv.slice(2).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=')
    return [k, v]
  }),
)
const URL_BASE = args.get('url') ?? 'http://127.0.0.1:4173/'
const OUT = args.get('out') ?? '.review'
const PORT = Number(args.get('port') ?? 9336)

const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
const browser = BROWSERS.find((p) => existsSync(p))
if (!browser) throw new Error('no Chromium browser found; add its path to BROWSERS')

const THEMES = args.get('theme') === 'both' ? ['light', 'dark'] : [args.get('theme') ?? 'dark']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
]

const ONLY = args.get('only')

const OPEN_MEGA = "(() => { const b = [...document.querySelectorAll('header button')].find((x) => x.textContent.trim().startsWith('云术')); if (!b) return 'mega trigger not found'; b.click(); return 'ok' })()"
const OPEN_DRAWER = "(() => { const b = document.querySelector('header button[aria-label=\"打开菜单\"]'); if (!b) return 'drawer trigger not found'; b.click(); return 'ok' })()"

mkdirSync(OUT, { recursive: true })

/* ---------------------------------------------------------------- DevTools */
const browserProcess = spawn(
  browser,
  [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + (process.env.TEMP ?? process.env.TMPDIR ?? '.') + '/cloudery-screenshot-profile',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const target = await (async () => {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json()
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch { /* devtools not up yet */ }
    await sleep(250)
  }
  throw new Error('DevTools endpoint never became reachable on port ' + PORT)
})()

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })

let nextId = 1
const pending = new Map()
const listeners = new Set()
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
  } else if (msg.method) {
    for (const listener of listeners) listener(msg)
  }
}

const send = (method, params = {}) => {
  const id = nextId++
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })
}
const waitFor = (method, timeout = 30000) =>
  new Promise((resolve, reject) => {
    const listener = (msg) => { if (msg.method === method) { listeners.delete(listener); resolve(msg.params) } }
    listeners.add(listener)
    setTimeout(() => { listeners.delete(listener); reject(new Error('timed out waiting for ' + method)) }, timeout)
  })
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  return result.result.value
}
const capture = async (name, clip) => {
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    ...(clip ? { clip: { scale: 1, ...clip } } : {}),
  })
  const path = OUT + '/' + name + '.png'
  writeFileSync(path, Buffer.from(shot.data, 'base64'))
  console.log('  ' + path + (clip ? '  (' + clip.width + 'x' + Math.round(clip.height) + ')' : ''))
}

await send('Page.enable')
await send('Runtime.enable')

/* ------------------------------------------------------------------ Driver */
async function load(width, height, theme) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 })
  await send('Page.navigate', { url: URL_BASE })
  await waitFor('Page.loadEventFired')
  await evaluate("localStorage.setItem('cloudery-theme', '" + theme + "')")
  const loaded = waitFor('Page.loadEventFired')
  await send('Page.reload')
  await loaded
  await sleep(2500) // fonts, remote avatars, first paint of the reveal animations
  await evaluate('window.scrollTo(0, 0)')
}

for (const theme of THEMES) {
  for (const viewport of VIEWPORTS) {
    const { name, width, height } = viewport
    const label = name + '-' + theme
    if (ONLY && !label.includes(ONLY) && ONLY !== 'all') continue
    console.log(label)
    await load(width, height, theme)
    await capture(label + '-full')

    const boxes = JSON.parse(await evaluate(
      "JSON.stringify([...document.querySelectorAll('main > *, footer')].map((el, i) => {" +
      '  const r = el.getBoundingClientRect();' +
      "  return { name: el.id || el.tagName.toLowerCase() + i, y: Math.round(r.top + window.scrollY), h: Math.round(r.height) }" +
      '}))',
    ))
    for (const box of boxes) {
      if (box.h < 24) continue
      await capture(label + '-' + box.name, { x: 0, y: box.y, width, height: Math.min(box.h, 4000) })
    }

    if (name === 'desktop') {
      const result = await evaluate(OPEN_MEGA)
      if (result === 'ok') { await sleep(700); await capture('menu-desktop-open', { x: 0, y: 0, width, height: 760 }) }
      else console.warn('  ' + result)
    }
    if (name === 'mobile') {
      const result = await evaluate(OPEN_DRAWER)
      if (result === 'ok') { await sleep(700); await capture('drawer-mobile-open', { x: 0, y: 0, width, height }) }
      else console.warn('  ' + result)
    }
  }
}

ws.close()
browserProcess.kill()
console.log('screenshots written to ' + OUT + '/')
