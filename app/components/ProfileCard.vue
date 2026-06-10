<script setup lang="ts">
const name = `\`\`\`javascript
const name = /^(Pa(wz(d|ywawzy)|use(\\.\\.\\.|(dMagician)?)))|(D(y|i)no$/
const age = /* Who knows */
\`\`\``
</script>

<template>
  <div class="flex gap-3">
    <div class="flex justify-center items-center">
      <NuxtImg
        src="https://github.com/PausedMagician.png"
        width="64"
        class="rounded-lg"
      />
    </div>
    <div>
      <ClientOnly>
        <template #fallback>
          <div class="grid gap-2 w-120 h-18.5">
            <USkeleton class="h-4 w-110" />
            <USkeleton class="h-4 w-50" />
          </div>
        </template>
        <MDC
          :value="name"
        />
      </ClientOnly>
    </div>
  </div>
</template>
