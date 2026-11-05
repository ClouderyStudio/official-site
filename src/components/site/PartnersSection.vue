<script setup lang="ts">
import { ref } from 'vue'
import { IconArrowForward, IconHandshake } from '@/icons'
import { contactEmail, partnerStats, partners } from '@/data/site'
import { M3Card, M3Icon } from '@clderystd/m3-ui'
import SectionHeading from './SectionHeading.vue'

const failed = ref<Record<number, boolean>>({})
</script>

<template>
  <section id="partners" class="section md-container" aria-labelledby="partners-heading">
    <SectionHeading id="partners-heading" lead="合作" accent="伙伴" caption="与我们携手共进的人们" />

    <div class="partners">
      <M3Card
        v-for="(partner, index) in partners"
        :key="partner.id"
        v-reveal="{ delay: index * 90 }"
        variant="outlined"
        shape="large"
        interactive
        class="partner"
        :href="partner.website"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="partner__logo">
          <img
            v-if="!failed[partner.id]"
            :src="partner.logo"
            :alt="partner.name + ' 标志'"
            loading="lazy"
            decoding="async"
            @error="failed[partner.id] = true"
          />
          <M3Icon v-else :icon="partner.icon" :size="32" />
        </span>
        <span class="partner__name md-typescale-label-large">{{ partner.name }}</span>
      </M3Card>
    </div>

    <div v-reveal="{ delay: 120 }" class="partner-stats">
      <template v-for="(stat, index) in partnerStats" :key="stat.label">
        <span v-if="index > 0" class="partner-stats__divider" aria-hidden="true" />
        <span class="partner-stats__item">
          <span v-count-up class="partner-stats__value md-typescale-headline-small">{{ stat.value }}</span>
          <span class="partner-stats__label md-typescale-body-small">{{ stat.label }}</span>
        </span>
      </template>
    </div>

    <div v-reveal="{ delay: 220 }" class="partner-cta">
      <p class="partner-cta__text md-typescale-body-medium">期待与更多优秀的团队合作，共同创造价值</p>
      <a class="partner-cta__link md-state-layer md-typescale-label-large" :href="'mailto:' + contactEmail">
        <M3Icon :icon="IconHandshake" :size="18" />
        寻求合作
        <M3Icon :icon="IconArrowForward" :size="18" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.partners {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.partner {
  width: 180px;
  text-align: center;
  padding-block: 8px;
}

.partner :deep(.md-card__content) {
  align-items: center;
  gap: 12px;
}

.partner__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  color: var(--md-sys-color-primary);
}

.partner__logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.75;
  transition:
    filter var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-standard),
    opacity var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-standard);
}

.partner__logo img,
.partner__logo :deep(svg) {
  transition: transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
}

@media (hover: hover) {
  .partner:hover .partner__logo img {
    filter: grayscale(0);
    opacity: 1;
  }

  .partner:hover .partner__logo img,
  .partner:hover .partner__logo :deep(svg) {
    transform: scale(1.1);
  }
}

.partner__name {
  color: var(--md-sys-color-on-surface);
}

.partner-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-block-start: 48px;
}

.partner-stats__divider {
  width: 1px;
  height: 32px;
  background-color: var(--md-sys-color-outline-variant);
}

.partner-stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.partner-stats__value {
  color: var(--md-sys-color-primary);
  font-weight: var(--md-ref-typeface-weight-bold);
}

.partner-stats__label {
  color: var(--md-sys-color-on-surface-variant);
}

.partner-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-block-start: 40px;
}

.partner-cta__text {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
}

.partner-cta__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--md-sys-shape-corner-full);
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  text-decoration: none;
  transition: box-shadow var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.partner-cta__link:hover {
  box-shadow: var(--md-sys-elevation-level1);
  transform: translateY(-2px);
}

@media (hover: hover) {
  .partner-cta__link {
    transition:
      box-shadow var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
      transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
  }

  .partner-cta__link:hover :deep(svg:last-of-type) {
    transform: translateX(4px);
  }

  .partner-cta__link :deep(svg) {
    transition: transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
  }
}
</style>
