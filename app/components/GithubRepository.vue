<script setup lang="ts">
const { url, name } = defineProps<{
  url: string
  name?: string
}>()
</script>

<template>
  <ULink
    :href="url"
    target="_blank"
    class="flex items-center w-fit p-1 gap-1"
  >
    <ThemeIcon
      name="skill-icons:github-light"
      dark="skill-icons:github-dark"
      class="size-6"
    />
    {{ name ?? "GitHub" }}
  </ULink>
</template>
