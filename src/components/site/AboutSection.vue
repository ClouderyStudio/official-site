<script setup lang="ts">
import { IconCheck } from '@/icons'
import { aboutIntro, capabilities, studioFacts, studioInfo } from '@/data/site'
import { M3Card, M3Icon } from '@/components/m3'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="about" class="section md-container" aria-labelledby="about-heading">
    <SectionHeading id="about-heading" lead="我们" accent="是谁?" caption="了解我们" />

    <div class="about">
      <div v-reveal class="about__copy">
        <p class="md-typescale-body-large">
          <span class="about__highlight">{{ aboutIntro.lead }}</span>{{ aboutIntro.before }}
        </p>
        <p class="md-typescale-body-large">
          我们专注于<span class="about__highlight">{{ aboutIntro.focus }}</span
          >{{ aboutIntro.and }}<span class="about__highlight">{{ aboutIntro.focusSecond }}</span
          >{{ aboutIntro.after }}
        </p>
        <p class="about__label md-typescale-title-medium">{{ aboutIntro.goalsLabel }}</p>
        <ul class="about__goals">
          <li v-for="goal in aboutIntro.goals" :key="goal" class="about__goal md-typescale-body-large">
            <M3Icon :icon="IconCheck" :size="20" class="about__goal-icon" />
            <span>{{ goal }}</span>
          </li>
        </ul>
        <p class="md-typescale-body-large about__outro">{{ aboutIntro.outro }}</p>
      </div>

      <div class="about__facts">
        <div
          v-for="(fact, index) in studioFacts"
          :key="fact.label"
          v-reveal="{ delay: 120 + index * 90 }"
          class="about__fact"
        >
          <span class="about__fact-icon"><M3Icon :icon="fact.icon" :size="24" /></span>
          <span class="about__fact-text">
            <span class="md-typescale-label-large">{{ fact.label }}</span>
            <span class="md-typescale-body-small">{{ fact.detail }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="about__stats">
      <M3Card
        v-for="(stat, index) in studioInfo.stats"
        :key="stat.label"
        v-reveal="{ delay: index * 90 }"
        variant="filled"
        shape="large"
        class="about__stat"
      >
        <span v-count-up class="about__stat-value md-typescale-display-small">{{ stat.value }}</span>
        <span class="about__stat-label md-typescale-body-medium">{{ stat.label }}</span>
      </M3Card>
    </div>

    <div class="about__capabilities">
      <M3Card
        v-for="(item, index) in capabilities"
        :key="item.title"
        v-reveal="{ delay: index * 80 }"
        variant="outlined"
        shape="large"
        class="capability"
      >
        <span class="capability__icon"><M3Icon :icon="item.icon" :size="28" /></span>
        <span class="capability__title md-typescale-title-medium">{{ item.title }}</span>
        <span class="capability__desc md-typescale-body-medium">{{ item.desc }}</span>
      </M3Card>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.about {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 48px;
  align-items: start;
}

@media (max-width: 899px) {
  .about {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}

.about__copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--md-sys-color-on-surface-variant);
}

.about__highlight {
  color: var(--md-sys-color-on-surface);
  font-size: 1.35em;
  font-weight: var(--md-ref-typeface-weight-medium);
}

.about__label {
  margin: 0;
  color: var(--md-sys-color-on-surface);
}

.about__goals {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.about__goal {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.about__goal-icon {
  color: var(--md-sys-color-primary);
  margin-block-start: 4px;
}

.about__outro {
  margin: 0;
}

.about__facts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about__fact {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: var(--md-sys-shape-corner-large);
  background-color: var(--md-sys-color-surface-container);
  transition: background-color var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-standard);
}

@media (hover: hover) {
  .about__fact:hover {
    background-color: var(--md-sys-color-surface-container-high);
  }

  .about__fact:hover .about__fact-icon {
    transform: scale(1.08) rotate(-4deg);
  }
}

.about__fact-icon {
  transition: transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
}

.about__fact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--md-sys-shape-corner-medium);
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  flex-shrink: 0;
}

.about__fact-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--md-sys-color-on-surface);
}

.about__fact-text > .md-typescale-body-small {
  color: var(--md-sys-color-on-surface-variant);
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-block-start: 48px;
}

@media (max-width: 719px) {
  .about__stats {
    grid-template-columns: minmax(0, 1fr);
  }
}

.about__stat {
  text-align: center;
  padding-block: 8px;
}

.about__stat :deep(.md-card__content) {
  align-items: center;
  gap: 4px;
}

.about__stat-value {
  color: var(--md-sys-color-primary);
  font-weight: var(--md-ref-typeface-weight-bold);
  transition: transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
}

@media (hover: hover) {
  .about__stat:hover .about__stat-value {
    transform: scale(1.06);
  }
}

.about__stat-label {
  color: var(--md-sys-color-on-surface-variant);
}

.about__capabilities {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-block-start: 24px;
}

@media (max-width: 1023px) {
  .about__capabilities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .about__capabilities {
    grid-template-columns: minmax(0, 1fr);
  }
}

.capability {
  gap: 12px;
}

.capability__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--md-sys-shape-corner-large);
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.capability__title {
  color: var(--md-sys-color-on-surface);
}

.capability__desc {
  color: var(--md-sys-color-on-surface-variant);
}

.capability__icon {
  transition: transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
}

/* Lifts on hover even though the card is not a link: the shadow and the
   primary outline keep the affordance honest. */
@media (hover: hover) {
  .md-card.capability {
    transition:
      transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
      box-shadow var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
  }

  .md-card.capability:hover {
    transform: translateY(-4px);
    box-shadow:
      inset 0 0 0 1px var(--md-sys-color-primary),
      var(--md-sys-elevation-level1);
  }

  .md-card.capability:hover .capability__icon {
    transform: scale(1.1) rotate(-5deg);
  }
}
</style>
