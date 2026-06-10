<script setup lang="ts">
import ToDoStatus from './ToDoStatus.vue'
import type { ToDoItem } from './index.vue'

const { items } = defineProps<{
  items: ToDoItem[] | undefined
}>()
</script>

<template>
  <UAccordion
    trailing-icon="i-lucide-arrow-down"
    type="multiple"
    :items="items"
    :unmount-on-hide="false"
    :ui="{
      body: 'px-3.5 text-base text-muted'
    }"
  >
    <template #default="{ item }">
      <h3 class="font-semibold text-[16px] p-1">
        {{ item.label }} <span
          v-if="item.completed"
          class="text-muted"
        >(completed: {{ item.completed }})</span>
      </h3>
      <ToDoStatus
        class="ml-1"
        :state="item.status"
      />
    </template>
    <template #body="{ item }">
      <ContentRenderer
        :value="item.body"
        unwrap="p"
      />
    </template>
  </UAccordion>
</template>
