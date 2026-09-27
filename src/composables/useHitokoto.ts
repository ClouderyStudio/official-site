import { onMounted, ref } from 'vue'
import { hitokotoEndpoint, hitokotoFallback } from '@/data/site'

interface HitokotoResponse {
  hitokoto?: string
  from?: string
  from_who?: string
}

/**
 * 一言 (hitokoto) quote used in the hero. Falls back to the legacy default when the
 * public API is unreachable, so the hero never renders empty.
 */
export function useHitokoto() {
  const quote = ref(hitokotoFallback.hitokoto)
  const from = ref(hitokotoFallback.from)

  onMounted(async () => {
    try {
      const response = await fetch(hitokotoEndpoint, { headers: { accept: 'application/json' } })
      if (!response.ok) return
      const data = (await response.json()) as HitokotoResponse
      if (data.hitokoto) quote.value = data.hitokoto
      from.value = data.from ?? data.from_who ?? ''
    } catch {
      // Keep the fallback quote.
    }
  })

  return { quote, from }
}
