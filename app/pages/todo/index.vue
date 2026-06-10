<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import type { MarkdownRoot, TodoCollectionItem } from '@nuxt/content'
import ToDoAccordion from './ToDoAccordion.vue'

export type ToDoItemStatus = 'Planned' | 'In Progress' | 'Done' | 'Abandoned'
export type ToDoItem = AccordionItem & { status: ToDoItemStatus, body: MarkdownRoot, completed?: string }

const { data: featureData } = await useAsyncData(`todo-features`, () => {
  return queryCollection('todo').where('type', '=', 'Feature').order('completed', 'ASC').order('status', 'DESC').all()
})
const { data: issueData } = await useAsyncData(`todo-issues`, () => {
  return queryCollection('todo').where('type', '=', 'Issue').order('status', 'DESC').all()
})

function map(item: TodoCollectionItem): ToDoItem {
  return {
    label: item.title,
    body: item.body,
    icon: item.icon,
    status: item.status,
    completed: item.completed ?? undefined
  }
}

function sort(a: ToDoItem, b: ToDoItem): number {
  if (a.status === b.status) return 0
  let aVal = a.status === 'In Progress' ? 3 : a.status === 'Done' ? 2 : a.status === 'Planned' ? 1 : 0
  let bVal = b.status === 'In Progress' ? 3 : b.status === 'Done' ? 2 : b.status === 'Planned' ? 1 : 0

  if (a.completed) aVal -= 3
  if (b.completed) bVal -= 3

  return bVal - aVal
}

const featureItems = computed(() => featureData.value?.map<ToDoItem>(map).sort(sort))
const issueItems = computed(() => issueData.value?.map<ToDoItem>(map).sort(sort))
</script>

<template>
  <UContainer>
    <UPageHeader
      title="ToDo"
      description="For all the features and issues."
    />
    <h2 class="mt-3 text-2xl font-semibold">
      Features
    </h2>
    <ToDoAccordion :items="featureItems" />
    <USeparator
      class="my-3"
    />
    <h2 class="mt-3 text-2xl font-semibold">
      Issues
    </h2>
    <ToDoAccordion :items="issueItems" />
  </UContainer>
</template>
