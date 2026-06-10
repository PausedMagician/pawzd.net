<script setup lang="ts">
import type { ToDoItemStatus } from './index.vue'

const props = defineProps<{
  state: ToDoItemStatus
}>()

const color = computed(() => {
  switch (props.state) {
    case 'Planned':
      return 'info'
    case 'In Progress':
      return 'warning'
    case 'Done':
      return 'success'
    case 'Abandoned':
      return 'error'
    default:
      return 'neutral'
  }
})
</script>

<template>
  <UBadge
    :color="color"
    variant="outline"
  >
    {{ props.state }}
  </UBadge>
</template>
