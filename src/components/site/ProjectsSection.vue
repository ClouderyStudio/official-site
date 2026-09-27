<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { IconGithub, IconLock, IconVisibility } from '@/icons'
import { projectTags, projects } from '@/data/site'
import { M3Button, M3Card, M3Icon, M3SegmentedButton } from '@/components/m3'
import SectionHeading from './SectionHeading.vue'

const selectedTag = ref('全部')

const filterOptions = projectTags.map((tag) => ({ value: tag, label: tag }))

const filteredProjects = computed(() =>
  selectedTag.value === '全部' ? projects : projects.filter((p) => p.category === selectedTag.value),
)

/* ---------- Filtering: the grid box has to shrink in step with the cards ----------
   Leaving cards are frozen at the coordinates they had before the filter changed
   and taken out of flow, so their slot is released at once and they fade out
   where they stood. The grid box then eases from its old height to the new one,
   otherwise the section would collapse in a single frame, well before the
   survivors finish sliding. */
const projectsEl = ref<HTMLElement | null>(null)
let prevBoxes = new Map<HTMLElement, { left: number; top: number; width: number; height: number }>()
let heightFrame = 0
let heightRun = 0
let heightGrid: HTMLElement | null = null
let filterClipTimer = 0

function gridEl(): HTMLElement | null {
  return projectsEl.value?.querySelector<HTMLElement>('.projects__grid') ?? null
}

function onHeightEnd(event: TransitionEvent): void {
  if (event.propertyName === 'height') releaseHeight()
}

function releaseHeight(): void {
  cancelAnimationFrame(heightFrame)
  const grid = heightGrid
  heightGrid = null
  if (!grid) return
  grid.removeEventListener('transitionend', onHeightEnd)
  grid.classList.remove('is-filtering')
  grid.style.transition = ''
  grid.style.height = ''
}

function onBeforeLeave(el: Element): void {
  const card = el as HTMLElement
  const box = prevBoxes.get(card)
  if (!box) return
  card.style.width = box.width + 'px'
  card.style.height = box.height + 'px'
  card.style.left = box.left + 'px'
  card.style.top = box.top + 'px'
}

watch(selectedTag, () => {
  const grid = gridEl()
  if (!grid) return

  cancelAnimationFrame(heightFrame)
  heightGrid?.removeEventListener('transitionend', onHeightEnd)
  const run = ++heightRun

  const parent = grid.getBoundingClientRect()
  prevBoxes = new Map()
  grid.querySelectorAll<HTMLElement>('.project').forEach((card) => {
    const box = card.getBoundingClientRect()
    prevBoxes.set(card, {
      left: box.left - parent.left,
      top: box.top - parent.top,
      width: box.width,
      height: box.height,
    })
  })

  const from = grid.offsetHeight
  heightGrid = grid
  /* Clip to the box while it resizes so a fading leaver can never paint over
     the section below. */
  grid.classList.add('is-filtering')
  window.clearTimeout(filterClipTimer)
  filterClipTimer = window.setTimeout(() => grid.classList.remove('is-filtering'), 800)
  grid.style.transition = 'none'
  grid.style.height = from + 'px'

  void nextTick(() => {
    if (run !== heightRun) return
    grid.style.height = 'auto'
    const to = grid.offsetHeight
    grid.style.height = from + 'px'
    void grid.offsetHeight
    if (Math.abs(to - from) < 1) {
      releaseHeight()
      return
    }
    /* A card that is still visually below the new box bottom is the only reason
       to keep the box tall while it glides up. If nothing is stranded, the space
       is handed back in the same frame as the click — no lingering gap. */
    const stranded = [...grid.querySelectorAll<HTMLElement>('.project')].some((card) => {
      if (card.classList.contains('project-leave-active')) return false
      const before = prevBoxes.get(card)
      return !!before && before.top + before.height > to + 2
    })
    if (!stranded) {
      /* Nothing has to glide up, so the space goes back in the same frame — and
         the leaving cards go with it instead of hanging over the next section. */
      grid.querySelectorAll<HTMLElement>('.project-leave-active').forEach((card) => {
        card.style.transition = 'none'
        card.style.opacity = '0'
      })
      releaseHeight()
      return
    }
    grid.style.transition =
      'height var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized)'
    grid.addEventListener('transitionend', onHeightEnd)
    heightFrame = requestAnimationFrame(() => {
      grid.style.height = to + 'px'
    })
  })
})

function onWindowResize(): void {
  releaseHeight()
}

onMounted(() => window.addEventListener('resize', onWindowResize, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.clearTimeout(filterClipTimer)
  cancelAnimationFrame(heightFrame)
})
</script>

<template>
  <section id="projects" class="section md-container" aria-labelledby="projects-heading">
    <SectionHeading id="projects-heading" lead="项目" accent="展示" caption="我们的各类项目" />

    <div v-reveal="{ delay: 80 }" class="projects__filter">
      <M3SegmentedButton v-model="selectedTag" :options="filterOptions" aria-label="项目分类筛选" />
    </div>

    <div v-reveal ref="projectsEl" class="projects">
      <TransitionGroup
        name="project"
        tag="div"
        class="projects__grid"
        @before-leave="onBeforeLeave"
      >
        <M3Card
          v-for="project in filteredProjects"
          :key="project.id"
          variant="outlined"
          shape="large"
          class="project"
        >
        <template #media>
          <div class="project__media">
            <M3Icon :icon="project.icon" :size="56" />
          </div>
        </template>

        <span class="project__title md-typescale-title-large">{{ project.title }}</span>
        <p class="project__desc md-typescale-body-medium">{{ project.description }}</p>

        <ul class="project__tags">
          <li v-for="tag in project.tags" :key="tag" class="md-tag">{{ tag }}</li>
        </ul>

        <template #actions>
          <M3Button
            v-if="project.view"
            variant="tonal"
            size="sm"
            :icon="IconVisibility"
            :href="project.view"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看
          </M3Button>

          <M3Button
            v-if="project.link"
            variant="filled"
            size="sm"
            :icon="IconGithub"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            源码
          </M3Button>

          <span v-else class="project__private md-typescale-label-medium">
            <M3Icon :icon="IconLock" :size="16" />
            私有或非开源项目
          </span>
        </template>
        </M3Card>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.projects__filter {
  display: flex;
  justify-content: center;
  margin-block-end: 40px;
}

.projects__filter :deep(.md-segmented) {
  flex-wrap: wrap;
}

.projects__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
  /* Rows pack from the top, so pinning the box height for a transition never
     stretches a row. */
  align-content: start;
}

/* While a filter transition runs the grid clips to its own (animating) box, so
   a card fading out at its frozen coordinates can never paint over the section
   below it. */
.projects__grid.is-filtering {
  overflow: hidden;
}

@media (max-width: 1023px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 699px) {
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.project {
  height: 100%;
}

/* Filtering: arriving cards settle in, leaving cards fade out and the
   survivors glide to their new grid slots.
   `.projects__grid` + `.project` out-specifies both M3Card's own `.md-card`
   transition and the `.md-card.project` hover transition below, which would
   otherwise win the cascade and replace these timings. */
.projects__grid .project.project-enter-active {
  transition:
    opacity var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized-decelerate),
    transform var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized-decelerate);
}

.projects__grid .project.project-leave-active {
  /* Out of flow at its frozen coordinates: frees the grid slot immediately. */
  position: absolute;
  transition:
    opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard-accelerate),
    transform var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard-accelerate);
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}

.projects__grid .project.project-move {
  transition: transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
}

@media (hover: hover) {
  .md-card.project {
    transition:
      transform var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized),
      box-shadow var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard);
  }

  .md-card.project:hover {
    transform: translateY(-4px);
    box-shadow:
      inset 0 0 0 1px var(--md-sys-color-primary),
      var(--md-sys-elevation-level1);
  }

  .project__media :deep(svg) {
    transition: transform var(--md-sys-motion-duration-extra-long1) var(--md-sys-motion-easing-emphasized);
  }

  .md-card.project:hover .project__media :deep(svg) {
    transform: scale(1.12) rotate(-4deg);
  }
}

.project__media {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 148px;
  background-image: linear-gradient(
    135deg,
    color-mix(in srgb, var(--md-sys-color-primary) 22%, transparent) 0%,
    color-mix(in srgb, var(--md-sys-color-tertiary) 22%, transparent) 100%
  );
  color: var(--md-sys-color-primary);
}

.project__title {
  color: var(--md-sys-color-on-surface);
  font-weight: var(--md-ref-typeface-weight-medium);
}

.project__desc {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
}

.project__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  /* Pushed to the bottom so the tag row and the action row line up across a grid row. */
  margin-block-start: auto;
}

.project > :deep(.md-card__content) {
  gap: 10px;
}

.project__private {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--md-sys-color-on-surface-variant);
  opacity: 0.8;
}
</style>
