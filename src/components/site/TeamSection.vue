<script setup lang="ts">
import { teamMembers } from '@/data/site'
import { M3Avatar, M3Card, M3IconButton } from '@clderystd/m3-ui'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="team" class="section md-container" aria-labelledby="team-heading">
    <SectionHeading id="team-heading" lead="核心" accent="成员" caption="遇见我们的团队" />

    <div class="team">
      <M3Card
        v-for="(member, index) in teamMembers"
        :key="member.id"
        v-reveal="{ delay: index * 80 }"
        variant="elevated"
        shape="large"
        interactive
        class="member"
      >
        <div class="member__head">
          <M3Avatar :src="member.avatar" :name="member.name" :size="96" ring />
        </div>

        <div class="member__identity">
          <span class="member__name md-typescale-title-large">{{ member.name }}</span>
          <span class="member__role md-typescale-label-large">{{ member.role }}</span>
        </div>

        <p class="member__bio md-typescale-body-medium">{{ member.bio }}</p>

        <ul class="member__skills">
          <li v-for="skill in member.skills" :key="skill" class="md-tag md-tag--outlined">{{ skill }}</li>
        </ul>

        <div v-if="member.socials?.length" class="member__socials">
          <M3IconButton
            v-for="social in member.socials"
            :key="social.platform"
            :icon="social.icon"
            :label="member.name + ' 的 ' + social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            variant="tonal"
            size="sm"
          />
        </div>
      </M3Card>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-block: 96px;
}

.team {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 1023px) {
  .team {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .team {
    grid-template-columns: minmax(0, 1fr);
  }
}

.member {
  text-align: center;
}

.member :deep(.md-card__content) {
  align-items: center;
  gap: 0;
}

.member__head {
  display: flex;
  justify-content: center;
  padding-block: 8px 16px;
}

.member__identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member__name {
  color: var(--md-sys-color-on-surface);
  font-weight: var(--md-ref-typeface-weight-medium);
}

.member__role {
  color: var(--md-sys-color-primary);
}

.member__bio {
  margin: 12px 0 0;
  color: var(--md-sys-color-on-surface-variant);
}

.member__skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-block-start: 16px;
}

.member__socials {
  display: flex;
  justify-content: center;
  gap: 8px;
  /* Pinned to the card bottom so social rows line up across a grid row. */
  margin-block-start: auto;
  padding-block-start: 16px;
}
</style>
