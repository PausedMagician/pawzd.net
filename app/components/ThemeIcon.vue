<script setup lang="ts">
const props = defineProps<{
  name: string
  dark?: string
}>()

const colorMode = useColorMode()

const icon = computed(() => {
  if (props.dark) {
    return colorMode.value === 'dark'
      ? props.dark
      : props.name
  } else {
    return props.name
  }
})
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <USkeleton class="size-4" />
    </template>
    <Icon :name="icon" />
  </ClientOnly>
</template>
