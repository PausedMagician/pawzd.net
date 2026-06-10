<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const items = ref<AccordionItem[]>([
  {
    label: 'Are there any Frequently asked questions?',
    content: 'NO!'
  },
  {
    label: 'Why?',
    content: ':/'
  }
])
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold">
      Frequenty Asked Questions
    </h2>
    <USeparator />
    <ClientOnly>
      <UAccordion
        :items="items"
        class="p-3"
      />
    </ClientOnly>
    <USeparator />
  </div>
</template>
