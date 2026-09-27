<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  IconDarkMode,
  IconExpandLess,
  IconExpandMore,
  IconGithub,
  IconLightMode,
  IconMenu,
} from '@/icons'
import { useActiveSection } from '@/composables/useActiveSection'
import { useScrolled } from '@/composables/useScrolled'
import { useTheme } from '@/composables/useTheme'
import { githubOrg, heroLogo, megaMenu, miniLinks, navLinks, qqGroup, socialLinks } from '@/data/site'
import {
  M3Button,
  M3Divider,
  M3Icon,
  M3IconButton,
  M3List,
  M3ListItem,
  M3Menu,
  M3Sheet,
  M3Switch,
  M3Tooltip,
  M3TopAppBar,
} from '@/components/m3'

const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

const { scrolled } = useScrolled()
const { active } = useActiveSection(sectionIds)
const { isDark, toggle } = useTheme()

const drawerOpen = ref(false)
const openGroups = ref<Record<string, boolean>>({})

function toggleGroup(category: string): void {
  openGroups.value[category] = !openGroups.value[category]
}

function closeDrawer(): void {
  drawerOpen.value = false
}

/* ---------- Sliding indicator that follows the section in view ---------- */
const navEl = ref<HTMLElement | null>(null)
const linkEls: (HTMLElement | null)[] = []
const indicatorX = ref(0)
const indicatorW = ref(0)
const indicatorVisible = ref(false)
const indicatorReady = ref(false)

function setLinkEl(el: unknown, index: number): void {
  linkEls[index] = (el as HTMLElement | null) ?? null
}

function measureIndicator(): void {
  const nav = navEl.value
  const index = navLinks.findIndex((link) => link.href === '#' + active.value)
  const el = index >= 0 ? linkEls[index] : null

  if (!nav || !el) {
    indicatorVisible.value = false
    return
  }

  const navBox = nav.getBoundingClientRect()
  const box = el.getBoundingClientRect()
  indicatorX.value = box.left - navBox.left
  indicatorW.value = box.width
  indicatorVisible.value = true
  // Arm the transition only after the indicator has been placed once, so the
  // first paint does not slide in from the left edge.
  if (!indicatorReady.value) requestAnimationFrame(() => (indicatorReady.value = true))
}

function repositionIndicator(): void {
  void nextTick(measureIndicator)
}

watch(active, repositionIndicator)

onMounted(() => {
  repositionIndicator()
  window.addEventListener('resize', repositionIndicator, { passive: true })
  void document.fonts?.ready.then(measureIndicator)
})

onBeforeUnmount(() => window.removeEventListener('resize', repositionIndicator))
</script>

<template>
  <M3TopAppBar overlay :scrolled="scrolled">
    <template #background>
      <span class="site-header__surface"></span>
    </template>

    <template #leading>
      <a class="site-header__brand" href="#top" aria-label="云术工作室 首页">
        <img class="site-header__logo" :src="heroLogo" alt="云术工作室" />
      </a>
    </template>

    <nav ref="navEl" class="site-header__nav" aria-label="主导航">
      <span
        class="site-header__indicator"
        :class="{ 'is-visible': indicatorVisible, 'is-ready': indicatorReady }"
        :style="{ width: indicatorW + 'px', transform: 'translateX(' + indicatorX + 'px)' }"
      ></span>

      <a
        v-for="(link, index) in navLinks"
        :key="link.href"
        :ref="(el) => setLinkEl(el, index)"
        class="site-header__link"
        :class="{ 'is-active': active === link.href.replace('#', '') }"
        :href="link.href"
      >
        {{ link.label }}
      </a>

      <M3Menu placement="bottom-start" :min-width="640" :padded="false">
        <template #trigger="{ open }">
          <button
            class="site-header__link site-header__link--menu"
            :class="{ 'is-open': open }"
            type="button"
            :aria-expanded="open"
          >
            {{ megaMenu.title }}
            <M3Icon class="site-header__chevron" :icon="IconExpandMore" :size="18" />
          </button>
        </template>

        <div class="mega">
          <div v-for="column in megaMenu.columns" :key="column.category" class="mega__column">
            <p class="mega__category md-typescale-title-small">{{ column.category }}</p>
            <ul class="mega__list">
              <li v-for="item in column.items" :key="item.name">
                <a class="mega__item" :href="item.href" target="_blank" rel="noopener noreferrer">
                  <M3Icon :icon="item.icon" :size="24" class="mega__icon" />
                  <span class="mega__text">
                    <span class="mega__name md-typescale-label-large">{{ item.name }}</span>
                    <span class="mega__desc md-typescale-body-small">{{ item.description }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </M3Menu>

      <a class="site-header__link" :href="qqGroup" target="_blank" rel="noopener noreferrer">QQ群</a>
    </nav>

    <template #actions>
      <M3Tooltip :text="isDark ? '切换到浅色模式' : '切换到深色模式'" placement="bottom">
        <M3IconButton
          :icon="isDark ? IconLightMode : IconDarkMode"
          :label="isDark ? '切换到浅色模式' : '切换到深色模式'"
          @click="toggle"
        />
      </M3Tooltip>

      <M3Tooltip text="GitHub" placement="bottom">
        <M3IconButton :icon="IconGithub" label="GitHub" :href="githubOrg" target="_blank" rel="noopener noreferrer" />
      </M3Tooltip>

      <span class="site-header__drawer-trigger">
        <M3IconButton :icon="IconMenu" label="打开菜单" @click="drawerOpen = true" />
      </span>

      <span class="site-header__cta">
        <M3Button href="#contact" :size="scrolled ? 'sm' : 'md'">联系我们</M3Button>
      </span>
    </template>
  </M3TopAppBar>

  <M3Sheet v-model="drawerOpen" side="end" size="min(420px, 92vw)" title="导航">
    <M3List dense>
      <M3ListItem
        v-for="link in navLinks"
        :key="link.href"
        :headline="link.label"
        :href="link.href"
        clickable
        @click="closeDrawer"
      />
    </M3List>

    <M3Divider inset="inset" />

    <div class="drawer-groups">
      <p class="drawer-groups__title md-typescale-title-small">{{ megaMenu.title }}</p>
      <div v-for="column in megaMenu.columns" :key="column.category" class="drawer-group">
        <button class="drawer-group__trigger" type="button" @click="toggleGroup(column.category)">
          <span class="md-typescale-label-large">{{ column.category }}</span>
          <M3Icon :icon="openGroups[column.category] ? IconExpandLess : IconExpandMore" :size="20" />
        </button>
        <Transition name="collapse">
          <ul v-show="openGroups[column.category]" class="drawer-group__list">
            <li v-for="item in column.items" :key="item.name">
              <a class="drawer-group__item" :href="item.href" target="_blank" rel="noopener noreferrer" @click="closeDrawer">
                <M3Icon :icon="item.icon" :size="20" />
                <span>{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>

    <M3Divider inset="inset" />

    <div class="drawer-theme">
      <span class="md-typescale-label-large">深色模式</span>
      <M3Switch :model-value="isDark" label="深色模式" @update:model-value="toggle" />
    </div>

    <M3Divider inset="inset" />

    <nav class="drawer-links" aria-label="快捷链接">
      <a
        v-for="link in miniLinks"
        :key="link.label"
        class="drawer-links__item md-typescale-body-medium"
        :href="link.href"
        :target="link.href.startsWith('http') ? '_blank' : undefined"
        rel="noopener noreferrer"
        @click="closeDrawer"
      >
        {{ link.label }}
      </a>
    </nav>

    <nav class="drawer-links drawer-links--social" aria-label="社交媒体">
      <a
        v-for="social in socialLinks"
        :key="social.name"
        class="drawer-links__item drawer-links__item--social md-typescale-body-medium"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <M3Icon :icon="social.icon" :size="20" />
        {{ social.name }}
      </a>
    </nav>
  </M3Sheet>
</template>

<style scoped>
/* ---------- Surface: invisible on the hero, a glass pill once scrolled ---------- */
.site-header__surface {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: 0;
  background-color: transparent;
  background-image: linear-gradient(
    180deg,
    color-mix(in srgb, var(--md-sys-color-surface) 58%, transparent),
    transparent
  );
  backdrop-filter: blur(0) saturate(1);
  transition:
    inset var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
    border-radius var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
    border-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    background-color var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    background-image var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    backdrop-filter var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard),
    box-shadow var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
}

.md-top-bar.is-scrolled .site-header__surface {
  inset: 8px 16px;
  border-radius: var(--md-sys-shape-corner-full);
  border-color: color-mix(in srgb, var(--md-sys-color-outline-variant) 65%, transparent);
  background-color: color-mix(in srgb, var(--md-sys-color-surface-container) 82%, transparent);
  background-image: linear-gradient(180deg, transparent, transparent);
  backdrop-filter: blur(18px) saturate(180%);
  box-shadow: var(--md-sys-elevation-level2);
}

/* Scrolled on a wide screen: the pill also pulls in toward the centre, so the
   bar reads as a compact floating control instead of a full-width band. */
@media (min-width: 1280px) {
  .md-top-bar.is-scrolled .site-header__surface {
    inset: 8px calc((100% - 1240px) / 2);
  }
}

/* ---------- Brand ---------- */
.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  margin-inline-start: -8px;
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface);
  text-decoration: none;
  transition: background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.site-header__brand:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
}

.site-header__logo {
  height: 34px;
  width: auto;
  transition:
    transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized),
    filter var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-standard);
}

.site-header__brand:hover .site-header__logo {
  transform: scale(1.06);
  filter: drop-shadow(0 3px 10px color-mix(in srgb, var(--md-sys-color-primary) 45%, transparent));
}

/* ---------- Nav ---------- */
.site-header__nav {
  position: relative;
  display: none;
  align-items: center;
  gap: 2px;
  margin-inline-start: 16px;
}

/* The active-section pill: one element that slides between the links. */
.site-header__indicator {
  position: absolute;
  inset-block: 4px;
  inset-inline-start: 0;
  z-index: 0;
  border-radius: var(--md-sys-shape-corner-full);
  background-color: var(--md-sys-color-secondary-container);
  opacity: 0;
  pointer-events: none;
}

.site-header__indicator.is-visible {
  opacity: 1;
}

.site-header__indicator.is-ready {
  transition:
    transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
    width var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
    opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.site-header__link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding-inline: 14px;
  border: none;
  background: none;
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-label-large-weight);
  letter-spacing: var(--md-sys-typescale-label-large-tracking);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    height var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.site-header__link:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-primary) 10%, transparent);
  color: var(--md-sys-color-primary);
}

.site-header__link:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.site-header__link.is-active {
  color: var(--md-sys-color-on-secondary-container);
  font-weight: 600;
}

/* Scrolled: tighter rows and icon buttons so the pill reads compact. */
.md-top-bar.is-scrolled .site-header__link {
  height: 36px;
}

.md-top-bar.is-scrolled :deep(.md-icon-btn) {
  height: 32px;
  width: 32px;
}

.site-header__link--menu.is-open {
  background-color: color-mix(in srgb, var(--md-sys-color-primary) 10%, transparent);
  color: var(--md-sys-color-primary);
}

.site-header__chevron {
  transition: transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.site-header__link--menu.is-open .site-header__chevron {
  transform: rotate(180deg);
}

.site-header__cta {
  display: none;
}

@media (min-width: 1024px) {
  .site-header__nav {
    display: flex;
  }
  .site-header__drawer-trigger {
    display: none;
  }
  .site-header__cta {
    display: inline-flex;
    margin-inline-start: 4px;
  }
}

@media (max-width: 1023px) {
  .md-top-bar.is-scrolled .site-header__surface {
    inset: 8px 10px;
  }
  .site-header__logo {
    height: 30px;
  }
}

/* ---------- Mega menu ---------- */
.mega {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 16px;
  width: min(760px, calc(100vw - 48px));
}

.mega__category {
  margin: 0 0 8px;
  padding-inline: 12px;
  color: var(--md-sys-color-primary);
  text-transform: none;
}

.mega__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mega__item {
  display: flex;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--md-sys-shape-corner-medium);
  color: var(--md-sys-color-on-surface);
  text-decoration: none;
  transition: background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.mega__item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  transform: translateX(4px);
}

.mega__item {
  transition:
    background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.mega__icon {
  color: var(--md-sys-color-primary);
  margin-block-start: 2px;
}

.mega__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.mega__desc {
  color: var(--md-sys-color-on-surface-variant);
}

/* ---------- Drawer ---------- */
.drawer-groups {
  padding: 16px;
}

.drawer-groups__title {
  margin: 0 0 12px;
  color: var(--md-sys-color-primary);
}

.drawer-group + .drawer-group {
  margin-block-start: 4px;
}

.drawer-group__trigger {
  transition: background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

/* Collapsible category groups: height eases open instead of snapping. */
.collapse-enter-active,
.collapse-leave-active {
  overflow: hidden;
  transition:
    max-height var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized),
    opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 320px;
  opacity: 1;
}

.drawer-group__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  padding: 12px 8px;
  border: none;
  background: none;
  border-radius: var(--md-sys-shape-corner-small);
  color: var(--md-sys-color-on-surface);
  cursor: pointer;
}

.drawer-group__trigger:hover {
  background-color: var(--md-sys-color-surface-container-high);
}

.drawer-group__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block: 4px;
}

.drawer-group__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--md-sys-shape-corner-small);
  color: var(--md-sys-color-on-surface-variant);
  text-decoration: none;
  font-size: var(--md-sys-typescale-body-medium-size);
}

.drawer-group__item {
  transition:
    background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.drawer-group__item:hover {
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-primary);
  transform: translateX(4px);
}

.drawer-theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 24px;
  color: var(--md-sys-color-on-surface);
}

.drawer-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 12px;
  padding: 16px 24px;
}

.drawer-links__item {
  padding-block: 8px;
  color: var(--md-sys-color-on-surface-variant);
  text-decoration: none;
  transition:
    color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    transform var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.drawer-links__item:hover {
  color: var(--md-sys-color-primary);
  transform: translateX(4px);
}

.drawer-links--social {
  border-block-start: 1px solid var(--md-sys-color-outline-variant);
}

.drawer-links__item--social {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
