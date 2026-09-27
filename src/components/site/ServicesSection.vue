<script setup lang="ts">
import { studioInfo } from '@/data/site'
import { IconArrowForward, IconCheck } from '@/icons'
import { M3Button, M3Card, M3Icon } from '@/components/m3'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="services" class="section md-container" aria-labelledby="services-heading">
    <SectionHeading id="services-heading" lead="我们的" accent="服务" caption="为您做些什么" />

    <div class="services">
      <div
        v-for="(service, index) in studioInfo.services"
        :key="service.title"
        v-reveal="{ delay: index * 110 }"
        class="services__item"
        :class="['services__item--tone-' + index, { 'services__item--lead': index === 0 }]"
      >
        <M3Card
          :variant="index === 0 ? 'filled' : 'outlined'"
          shape="extra-large"
          class="service"
        >
          <span class="service__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="service__icon">
            <M3Icon :icon="service.icon" :size="index === 0 ? 40 : 26" />
          </span>
          <span
            class="service__title"
            :class="index === 0 ? 'md-typescale-headline-medium' : 'md-typescale-title-large'"
            >{{ service.title }}</span
          >
          <span
            class="service__desc"
            :class="index === 0 ? 'md-typescale-body-large' : 'md-typescale-body-medium'"
            >{{ service.desc }}</span
          >
          <ul class="service__points" :class="{ 'service__points--wide': index === 0 }">
            <li v-for="point in service.points" :key="point" class="service__point">
              <M3Icon :icon="IconCheck" :size="16" class="service__point-icon" />
              <span>{{ point }}</span>
            </li>
          </ul>
          <M3Button
            v-if="index === 0"
            class="service__cta"
            variant="text"
            size="sm"
            href="#projects"
            :trailing-icon="IconArrowForward"
          >
            看看我们的作品
          </M3Button>
        </M3Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.services {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

@media (min-width: 1000px) {
  .services {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  /* Bento: the first service claims a 2x2 area, the other two stack beside it. */
  .services__item--lead {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    min-height: 384px;
  }

  .services__item:not(.services__item--lead) {
    min-height: 182px;
  }
}

.services__item {
  display: flex;
}

/* One tonal accent per service so the row reads as a palette, not a repeat. */
.services__item--tone-0 {
  --service-accent: var(--md-sys-color-primary);
  --service-tile: var(--md-sys-color-primary-container);
  --service-on-tile: var(--md-sys-color-on-primary-container);
  --service-on-accent: var(--md-sys-color-on-primary);
}

.services__item--tone-1 {
  --service-accent: var(--md-sys-color-tertiary);
  --service-tile: var(--md-sys-color-tertiary-container);
  --service-on-tile: var(--md-sys-color-on-tertiary-container);
  --service-on-accent: var(--md-sys-color-on-tertiary);
}

.services__item--tone-2 {
  --service-accent: var(--md-sys-color-secondary);
  --service-tile: var(--md-sys-color-secondary-container);
  --service-on-tile: var(--md-sys-color-on-secondary-container);
  --service-on-accent: var(--md-sys-color-on-secondary);
}

.service {
  position: relative;
  flex: 1;
  isolation: isolate;
}

/* The featured card carries the brand tint instead of a plain grey fill, so it
   reads as the primary surface of the row; the small cards sit one step brighter
   than the page background. */
.services__item--lead .service.md-card {
  background-color: color-mix(in srgb, var(--service-accent) 9%, var(--md-sys-color-surface));
}

.services__item:not(.services__item--lead) .service.md-card {
  background-color: var(--site-surface-raised);
}

/* Accent wash, kept in its own layer so text stays above it. */
.service::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: radial-gradient(
    120% 120% at 100% 0%,
    color-mix(in srgb, var(--service-accent) 20%, transparent),
    color-mix(in srgb, var(--service-accent) 0%, transparent) 62%
  );
  opacity: 0.7;
  pointer-events: none;
  transition: opacity var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-standard);
}

.service__index {
  position: absolute;
  z-index: 2;
  inset-block-start: 22px;
  inset-inline-end: 26px;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-label-large-weight);
  line-height: var(--md-sys-typescale-label-large-line-height);
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
  opacity: 0.65;
  transition:
    color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    opacity var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

/* The featured card turns its index into an oversized ghost numeral. */
.services__item--lead .service__index {
  inset-block-start: 14px;
  inset-inline-end: 34px;
  font-size: 72px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  color: var(--service-accent);
  opacity: 0.16;
}

.service :deep(.md-card__content) {
  position: relative;
  z-index: 1;
  gap: 10px;
  padding: 24px;
}

.services__item--lead .service :deep(.md-card__content) {
  gap: 12px;
  padding: 30px 34px 34px;
}

.service__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 52px;
  block-size: 52px;
  margin-block-end: auto;
  border-radius: var(--md-sys-shape-corner-large);
  background-color: var(--service-tile);
  color: var(--service-on-tile);
  transition:
    background-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized),
    box-shadow var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.services__item--lead .service__icon {
  inline-size: 72px;
  block-size: 72px;
  border-radius: var(--md-sys-shape-corner-extra-large);
}

.service__title {
  color: var(--md-sys-color-on-surface);
}

.services__item--lead .service__title {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.services__item--lead .service__title::before {
  content: '';
  inline-size: 44px;
  block-size: 3px;
  border-radius: var(--md-sys-shape-corner-full);
  background-color: var(--service-accent);
}

.service__desc {
  color: var(--md-sys-color-on-surface-variant);
  max-width: 44ch;
}

/* Deliverable checklist: a tight list on the small cards, a wide 3-up row on
   the featured card so its extra width carries real information. */
.service__points {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.service__point {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-small-size);
  font-weight: 500;
  line-height: 1.45;
}

.service__point-icon {
  flex: none;
  margin-block-start: 2px;
  color: var(--service-accent);
}

/* The 3-up checklist only exists at the bento breakpoint; on narrow screens the
   points stay a single readable column. */
@media (min-width: 1000px) {
  .services__item--lead .service__points--wide {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px 20px;
  }
}

.services__item--lead .service__point {
  font-size: var(--md-sys-typescale-body-medium-size);
  font-weight: 400;
}

.service__cta {
  align-self: flex-start;
  margin-block-start: 6px;
  margin-inline-start: -8px;
}

@media (hover: hover) {
  .services__item .service:hover {
    transform: translateY(-4px);
  }

  .services__item--lead .service:hover {
    box-shadow: var(--md-sys-elevation-level2);
  }

  .services__item:not(.services__item--lead) .service:hover {
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--service-accent) 45%, transparent),
      var(--md-sys-elevation-level1);
  }

  .service:hover::before {
    opacity: 1;
  }

  .service:hover .service__icon {
    background-color: var(--service-accent);
    color: var(--service-on-accent);
    transform: scale(1.06) rotate(-6deg);
    box-shadow: var(--md-sys-elevation-level1);
  }

  .service:hover .service__index {
    color: var(--service-accent);
    opacity: 1;
  }

  .services__item--lead .service:hover .service__index {
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services__item .service:hover,
  .service:hover .service__icon {
    transform: none;
  }
}
</style>
