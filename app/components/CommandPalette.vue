<script lang="ts" setup>
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'

const route = useRoute()

function createPaletteItemRoute(label: string, link: string, description?: string): CommandPaletteItem {
  const active = route.path === link
  return {
    label,
    description,
    onSelect: () => {
      if (active) return
      navigateTo(link)
    },
    active
  }
}

const { data } = await useAsyncData('projects-navigation', () => queryCollectionNavigation('projects', ['description']))

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => [
  {
    id: 'navigation', label: 'Navigation', items: [
      createPaletteItemRoute('Home', '/'),
      createPaletteItemRoute('ToDo', '/todo', 'Current issues and todo for the website.'),
      createPaletteItemRoute('About me', '/about', 'Where I disclose what I feel like about myself. Like projects that are public.'),
      createPaletteItemRoute('Test', '/test', 'Testing place!')
    ]
  },
  ...data.value?.map(group => ({
    id: group.stem!, label: group.title, items: (group.children ?? []).map(v => createPaletteItemRoute(v.title, v.path, v.description as string))
  })) ?? [],
  {
    id: 'alerts', label: 'Alerts', items: [
      { label: 'Alert', onSelect: () => { alert('hello?') } }
    ]
  }
])
</script>

<template>
  <ClientOnly>
    <UDashboardSearch :groups="groups" />
  </ClientOnly>
</template>
