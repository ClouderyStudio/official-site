import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Id of the section currently crossing the middle of the viewport, or '' when
 * none of them is. Used by the header's sliding active indicator.
 */
export function useActiveSection(ids: string[]) {
  const active = ref('')
  const inView = new Set<string>()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!targets.length) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id)
          else inView.delete(entry.target.id)
        }
        // Document order keeps the choice stable when two sections overlap the band.
        active.value = ids.find((id) => inView.has(id)) ?? ''
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const el of targets) observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { active }
}
