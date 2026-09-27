<script setup lang="ts">
withDefaults(
  defineProps<{
    /** First part of the heading, rendered in the solid heading colour. */
    lead: string
    /** Second part, rendered with the gradient accent. */
    accent: string
    /** Small caption wrapped in double backticks, matching the legacy site. */
    caption?: string
    /** Anchor target for in-page navigation. */
    id?: string
    align?: 'center' | 'start'
  }>(),
  { caption: undefined, id: undefined, align: 'center' },
)
</script>

<template>
  <h2 :id="id" v-reveal="{ blur: true }" class="section-heading" :class="'section-heading--' + align">
    <span class="section-heading__title md-typescale-headline-large">
      {{ lead }}<span class="section-heading__accent">{{ accent }}</span>
    </span>
    <span v-if="caption" class="section-heading__caption md-typescale-body-small">`` {{ caption }} ``</span>
  </h2>
</template>

<style scoped>
.section-heading {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 0 48px;
  color: var(--md-sys-color-on-surface);
}

.section-heading--center {
  align-items: center;
  text-align: center;
}

.section-heading--start {
  align-items: flex-start;
  text-align: start;
}

.section-heading__title {
  display: block;
  margin: 0;
  font-weight: var(--md-sys-typescale-headline-large-weight);
}

.section-heading__accent {
  /* Oversized gradient + slow pan so the accent keeps drifting. */
  background-image: linear-gradient(
    100deg,
    var(--md-sys-color-primary) 0%,
    var(--md-sys-color-tertiary) 28%,
    var(--md-sys-color-primary) 55%,
    var(--md-sys-color-tertiary) 80%,
    var(--md-sys-color-primary) 100%
  );
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: md-gradient-pan 9s var(--md-sys-motion-easing-linear) infinite;
}

.section-heading__caption {
  position: relative;
  color: var(--md-sys-color-on-surface-variant);
  letter-spacing: 0.2em;
  animation: md-fade-in var(--md-sys-motion-duration-extra-long2) var(--md-sys-motion-easing-standard) 160ms both;
}

/* Thin rule that grows out of the caption once the heading is revealed. */
.section-heading__caption::after {
  content: '';
  display: block;
  width: 56px;
  height: 2px;
  margin: 10px auto 0;
  border-radius: 2px;
  background-image: linear-gradient(90deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary));
  transform: scaleX(0);
  transition: transform var(--md-sys-motion-duration-extra-long1)
    var(--md-sys-motion-easing-emphasized-decelerate) 200ms;
}

.section-heading--start .section-heading__caption::after {
  margin-inline: 0 auto;
}

.section-heading.is-revealed .section-heading__caption::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  /* Only the endless gradient pan stops; the caption fade and the rule
     reveal are one-shot and stay. */
  .section-heading__accent {
    animation: none;
  }
}
</style>
