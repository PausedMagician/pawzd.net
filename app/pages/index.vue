<script setup lang="ts">
import type { ChangelogVersionProps } from '@nuxt/ui'

const versions = ref<(ChangelogVersionProps & { content?: string })[]>([
  {
    title: 'Cursors!!!',
    description: 'Cursors now dart around the page.',
    image: '/Cursors.png',
    date: '2026-06-10',
    ui: {
      imageWrapper: 'border border-default',
      image: 'object-contain'
    }
  },
  {
    title: 'About me!',
    description: 'Created a page where things about me are listed!',
    to: '/about',
    date: '2026-06-09'
  },
  {
    title: 'ToDo!',
    description: 'Created a page where features and issues can live!',
    to: '/todo',
    image: '/ToDoChange1.png',
    date: '2026-06-09',
    ui: {
      imageWrapper: 'border border-default'
    }
  },
  {
    title: 'Work!',
    description: 'Added this and the one below! And database stuff.',
    image: '/dino-cat.gif',
    date: '2026-06-08',
    ui: {
      image: 'object-contain'
    }
  },
  {
    title: 'Remaking website',
    description: 'Nextjs not fun to use :(',
    date: '2026-06-02'
  }
])
</script>

<template>
  <UContainer>
    <UPageHeader
      description="It's a website. I don't know man ;("
    />
    <UPageBody>
      <UChangelogVersions>
        <UChangelogVersion
          v-for="(version, index) in versions"
          :key="index"
          v-bind="version"
        >
          <template #body>
            <MDC
              v-if="version.content"
              :value="version.content"
            />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </UPageBody>
  </UContainer>
</template>
