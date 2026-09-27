<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { IconArrowForward, IconExpandMore, IconGithub } from '@/icons'
import { useHitokoto } from '@/composables/useHitokoto'
import { githubOrg, heroImage, heroLogo, studioInfo } from '@/data/site'
import { M3Button, M3IconButton } from '@/components/m3'
import ParticlesBackground from './ParticlesBackground.vue'

const { quote, from } = useHitokoto()

/* Scroll-linked drift: 0 at the top, 1 once the hero has scrolled away. */
const heroRef = ref<HTMLElement | null>(null)
let frame = 0

function measure(): void {
  frame = 0
  const el = heroRef.value
  if (!el) return
  const span = Math.max(el.offsetHeight * 0.85, 1)
  const progress = Math.min(Math.max(window.scrollY / span, 0), 1)
  el.style.setProperty('--hero-scroll', progress.toFixed(3))
}

function onScroll(): void {
  if (!frame) frame = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section
    id="top"
    ref="heroRef"
    class="hero"
    :style="{ backgroundImage: 'url(' + heroImage + ')' }"
    aria-labelledby="hero-title"
  >
    <div class="hero__scrim" />
    <div class="hero__sheen" />
    <div class="hero__particles">
      <ParticlesBackground
        :quantity="150"
        :staticity="100"
        :ease="150"
        color="var(--md-sys-color-primary)"
      />
    </div>

    <div class="hero__content md-container">
      <img class="hero__logo" :src="heroLogo" alt="云术工作室" width="360" height="128" />

      <h1 id="hero-title" class="hero__tagline md-typescale-headline-small">
        {{ studioInfo.tagline }}
      </h1>

      <p class="hero__description md-typescale-body-large">{{ studioInfo.description }}</p>

      <blockquote class="hero__quote md-typescale-body-large">
        <span class="hero__quote-mark">“</span>{{ quote }}<span class="hero__quote-mark">”</span>
        <cite class="hero__quote-from md-typescale-label-medium">—— {{ from }}</cite>
      </blockquote>

      <div class="hero__actions">
        <M3Button variant="filled" size="lg" :trailing-icon="IconArrowForward" href="#projects">
          查看项目
        </M3Button>
        <M3Button variant="outlined" size="lg" :icon="IconGithub" :href="githubOrg" target="_blank" rel="noopener noreferrer">
          GitHub
        </M3Button>
      </div>
    </div>

    <div class="hero__scroll">
      <M3IconButton :icon="IconExpandMore" label="向下浏览" variant="tonal" href="#about" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: min(100dvh, 900px);
  padding-block: 96px 120px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow: hidden;
  isolation: isolate;
}

@media (max-width: 839px) {
  .hero {
    background-attachment: scroll;
  }
}

/* A single alpha works for both schemes: the surface role itself flips with the theme,
   so this reads as a light wash on the photo in light mode and a dark one in dark mode. */
.hero__scrim {
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, var(--md-sys-color-surface) 76%, transparent);
  z-index: -1;
  animation: md-fade-in var(--md-sys-motion-duration-extra-long2) var(--md-sys-motion-easing-standard-decelerate) both;
}

/* One diagonal highlight sweeping across the photo on load. */
.hero__sheen {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(
    105deg,
    transparent 38%,
    color-mix(in srgb, var(--md-sys-color-on-surface) 14%, transparent) 50%,
    transparent 62%
  );
  background-size: 220% 100%;
  background-repeat: no-repeat;
  animation: md-sheen var(--md-sys-motion-duration-extra-long4) var(--md-sys-motion-easing-standard-decelerate) 200ms both;
}

.hero__particles {
  position: absolute;
  inset: 0;
  z-index: -1;
  color: var(--md-sys-color-primary);
  opacity: 0.7;
  animation: md-fade-in var(--md-sys-motion-duration-extra-long4) var(--md-sys-motion-easing-standard) 300ms both;
}

.hero__content {
  position: relative;
  /* Scroll-linked drift; --hero-parallax is damped under reduced motion. */
  --hero-parallax: 1;
  transform: translate3d(0, calc(var(--hero-scroll, 0) * -56px * var(--hero-parallax)), 0);
  opacity: calc(1 - var(--hero-scroll, 0) * 0.85 * var(--hero-parallax));
  will-change: transform, opacity;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 840px;
}

/* Staggered entrance: every line settles in just after the one above it. */
.hero__content > * {
  animation: md-fade-up var(--md-sys-motion-duration-extra-long2)
    var(--md-sys-motion-easing-emphasized-decelerate) both;
}

.hero__content > *:nth-child(1) {
  animation-delay: 60ms;
}

.hero__content > *:nth-child(2) {
  animation-delay: 180ms;
}

.hero__content > *:nth-child(3) {
  animation-delay: 300ms;
}

.hero__content > *:nth-child(4) {
  animation-delay: 420ms;
}

.hero__content > *:nth-child(5) {
  animation-delay: 540ms;
}

.hero__logo {
  width: min(320px, 70vw);
  height: auto;
  filter: drop-shadow(0 6px 24px rgb(0 0 0 / 0.18));
  transition: transform var(--md-sys-motion-duration-medium4)
    var(--md-sys-motion-easing-emphasized);
}

@media (hover: hover) {
  .hero__logo:hover {
    transform: translateY(-6px) scale(1.02);
  }
}

.hero__tagline {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-weight: var(--md-ref-typeface-weight-medium);
}

.hero__description {
  margin: 0;
  max-width: 640px;
  color: var(--md-sys-color-on-surface-variant);
}

.hero__quote {
  position: relative;
  margin: 0;
  max-width: 640px;
  color: var(--md-sys-color-on-surface);
  font-style: italic;
  line-height: 1.9;
  transition: color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.hero__quote-mark {
  color: var(--md-sys-color-primary);
  font-style: normal;
}

.hero__quote-from {
  display: block;
  margin-block-start: 8px;
  color: var(--md-sys-color-on-surface-variant);
  font-style: normal;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-block-start: 8px;
}

.hero__scroll {
  position: absolute;
  inset-block-end: 32px;
  inset-inline-start: 50%;
  translate: -50% 0;
  animation:
    md-fade-in var(--md-sys-motion-duration-long2) var(--md-sys-motion-easing-standard) 900ms both,
    hero-bob 2.4s var(--md-sys-motion-easing-standard) 1.4s infinite;
}

@keyframes hero-bob {
  0%,
  100% {
    translate: -50% 0;
  }
  50% {
    translate: -50% 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* The endless bob stops; entrances keep playing, minus the slide. */
  .hero__scroll {
    animation: none;
  }

  /* Scroll drift is damped, not removed. */
  .hero__content {
    --hero-parallax: 0.3;
  }

  .hero__content > *:nth-child(n) {
    animation-name: md-fade-in;
  }
}
</style>
