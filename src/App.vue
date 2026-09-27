<script setup lang="ts">
import { IconArrowUpward } from '@/icons'
import { useScrolled } from '@/composables/useScrolled'
import { M3Fab } from '@/components/m3'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import HeroSection from '@/components/site/HeroSection.vue'
import LineCursor from '@/components/site/LineCursor.vue'
import AboutSection from '@/components/site/AboutSection.vue'
import ServicesSection from '@/components/site/ServicesSection.vue'
import TeamSection from '@/components/site/TeamSection.vue'
import ProjectsSection from '@/components/site/ProjectsSection.vue'
import CtaSection from '@/components/site/CtaSection.vue'
import PartnersSection from '@/components/site/PartnersSection.vue'

const { scrolled: showBackToTop } = useScrolled(600)

function backToTop(): void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<template>
  <a class="md-skip-link" href="#main">跳到主要内容</a>

  <LineCursor />

  <SiteHeader />

  <main id="main">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <TeamSection />
    <ProjectsSection />
    <CtaSection />
    <PartnersSection />
  </main>

  <SiteFooter />

  <Transition name="fab">
    <M3Fab
      v-if="showBackToTop"
      :icon="IconArrowUpward"
      label="回到顶部"
      size="md"
      fixed
      aria-label="回到顶部"
      @click="backToTop"
    />
  </Transition>
</template>

<style>
/* The header floats over the hero, so the page starts under it. */
#main {
  margin-block-start: calc(-1 * var(--md-sys-top-app-bar-height));
}

.fab-enter-active,
.fab-leave-active {
  transition:
    opacity var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized-decelerate),
    translate var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized-decelerate);
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  translate: 0 16px;
}
</style>
