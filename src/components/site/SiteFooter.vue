<script setup lang="ts">
import { contactEmail, footerColumns, heroLogo, socialLinks, studioInfo } from '@/data/site'
import { M3Icon, M3IconButton } from '@clderystd/m3-ui'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner md-container">
      <div v-reveal class="footer__brand">
        <a class="footer__logo-link" href="#top" aria-label="回到顶部">
          <img class="footer__logo" :src="heroLogo" alt="云术工作室" />
        </a>
        <p class="footer__tagline md-typescale-body-medium">{{ studioInfo.tagline }}</p>
        <a class="footer__mail md-typescale-body-small" :href="'mailto:' + contactEmail">{{ contactEmail }}</a>

        <div class="footer__socials">
          <M3IconButton
            v-for="social in socialLinks"
            :key="social.name"
            :icon="social.icon"
            :label="social.name"
            variant="tonal"
            size="sm"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>

      <nav
        v-for="(column, index) in footerColumns"
        :key="column.title"
        v-reveal="{ delay: 80 + index * 70 }"
        class="footer__column"
        :aria-label="column.title"
      >
        <p class="footer__column-title md-typescale-title-small">{{ column.title }}</p>
        <ul class="footer__links">
          <li v-for="link in column.links" :key="link.label">
            <a
              class="footer__link md-typescale-body-medium"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="footer__bottom">
      <div v-reveal="{ delay: 140 }" class="footer__bottom-inner md-container">
        <p class="footer__copyright md-typescale-body-small">
          Copyright 2023-{{ year }} Cloudery Studio, All rights reserved.
        </p>
        <p class="footer__note md-typescale-body-small">
          <M3Icon :icon="socialLinks[0]!.icon" :size="16" />
          {{ studioInfo.name }} · 创意与技术的完美结合
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-block-start: 48px;
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: 40px;
  padding-block: 56px 40px;
}

@media (max-width: 899px) {
  .footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
}

@media (max-width: 559px) {
  .footer__inner {
    grid-template-columns: minmax(0, 1fr);
  }
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__logo {
  height: 36px;
  width: auto;
}

.footer__tagline {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
}

.footer__mail {
  color: var(--md-sys-color-primary);
  text-decoration: none;
}

.footer__socials {
  display: flex;
  gap: 8px;
  margin-block-start: 4px;
}

.footer__column-title {
  margin: 0 0 12px;
  color: var(--md-sys-color-on-surface);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer__link {
  color: var(--md-sys-color-on-surface-variant);
  text-decoration: none;
  transition: color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.footer__link:hover {
  color: var(--md-sys-color-primary);
}

.footer__bottom {
  border-block-start: 1px solid var(--md-sys-color-outline-variant);
}

.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-block: 20px;
}

.footer__copyright,
.footer__note {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
}

.footer__note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
