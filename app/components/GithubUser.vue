<script setup lang="ts">
const { username, imgSize } = defineProps<{
  username: string
  imgSize?: number
}>()
</script>

<template>
  <ULink
    v-if="username !== 'redacted'"
    :to="`https://github.com/${username}`"
    target="_blank"
    class="flex items-center w-fit p-1 gap-1"
  >
    <NuxtImg
      :src="`https://github.com/${username}.png`"
      :width="imgSize ?? 24"
      class="rounded"
    />
    @{{ username }}
  </ULink>
  <ULink
    v-else
    :to="`https://github.com/`"
    target="_blank"
    class="flex items-center w-fit p-1 gap-1"
  >
    <NuxtImg
      src="/icon.svg"
      :width="imgSize ?? 24"
      class="rounded"
    />
    @[REDACTED]
  </ULink>
</template>
