<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/icon.svg' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const config = useRuntimeConfig()
const title = 'Pawzd'
const description = 'Not so ready yet.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: config.public.hostUrl + 'icon.svg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
