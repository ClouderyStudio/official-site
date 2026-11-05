<script setup lang="ts">
import { contactEmail, ctaChannels, studioInfo } from '@/data/site'
import { M3Button } from '@clderystd/m3-ui'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="contact" class="section md-container" aria-labelledby="contact-heading">
    <div v-reveal class="cta">
      <SectionHeading
        id="contact-heading"
        lead="加入"
        accent="我们?"
        caption="即刻开始"
      />

      <p class="cta__lead md-typescale-body-large">
        准备开始您的项目了吗？与我们合作，将您的想法转化为现实。立即联系我们，开始您的数字之旅。
      </p>

      <div class="cta__actions">
        <M3Button
          v-for="channel in ctaChannels"
          :key="channel.label"
          :variant="channel.variant"
          :icon="channel.icon"
          size="lg"
          :href="channel.href"
          :target="channel.href.startsWith('http') ? '_blank' : undefined"
          rel="noopener noreferrer"
        >
          {{ channel.label }}
        </M3Button>
      </div>

      <p class="cta__mail md-typescale-body-medium">
        也可以直接发邮件到
        <a class="cta__mail-link" :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
        ，和我们聊聊你的想法。
      </p>

      <p class="cta__signature md-typescale-label-medium">—— {{ studioInfo.name }}</p>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
  border-radius: var(--md-sys-shape-corner-extra-large);
  background-color: var(--md-sys-color-surface-container);
  box-shadow: var(--md-sys-elevation-level1);
}

.cta :deep(.section-heading) {
  margin-block-end: 20px;
}

.cta__lead {
  margin: 0 0 28px;
  max-width: 640px;
  text-align: center;
  color: var(--md-sys-color-on-surface-variant);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.cta__mail {
  margin: 24px 0 0;
  color: var(--md-sys-color-on-surface-variant);
}

.cta__mail-link {
  color: var(--md-sys-color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cta__signature {
  margin: 12px 0 0;
  color: var(--md-sys-color-on-surface-variant);
  opacity: 0.8;
}
</style>
