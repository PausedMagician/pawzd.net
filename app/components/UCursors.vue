<script setup lang="ts">
import type { Cursor } from '~~/server/utils/drizzle'

const route = useRoute()
const sessionId = useSessionId()
const enabled = ref(false)
const { data: cursors } = await useFetch<Cursor[]>(`/api/cursors/${route.path}`)

const width = ref(0)
const height = ref(0)
const x = useState('mouse-x', () => 0)
const y = useState('mouse-y', () => 0)

function resize() {
  width.value = document.documentElement.clientWidth
  height.value = document.documentElement.scrollHeight
}

function move(e: MouseEvent) {
  const newX = Math.max(0, Math.min(Math.round((e.pageX / width.value) * 1000) / 10, 100)) // 0 to 100
  const newY = Math.max(0, Math.min(Math.round((e.pageY / height.value) * 1000) / 10, 100))
  x.value = newX
  y.value = newY
}

let lastX = 0
let lastY = 0
async function updateCursor() {
  if (x.value === lastX && y.value === lastY) return
  lastX = x.value
  lastY = y.value

  await $fetch(`/api/cursors/${route.path}`, {
    method: 'POST',
    body: { x: x.value, y: y.value }
  })
}

let intervalId: NodeJS.Timeout | undefined
const eventSource = ref<EventSource | null>(null)

function setup() {
  if (intervalId) clearInterval(intervalId)
  if (eventSource.value) eventSource.value.close()
  if (!enabled.value) return

  intervalId = setInterval(updateCursor, 2000)

  eventSource.value = new EventSource(`/api/cursors/${route.path}`)

  eventSource.value.addEventListener('message', (event) => {
    cursors.value = JSON.parse(event.data)
  })
}

onMounted(() => {
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', move)
  resize()
  setup()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', move)
  clearInterval(intervalId)
  if (eventSource.value) {
    eventSource.value.close()
  }
})

watch(
  () => route.path + enabled.value,
  () => {
    setup()
  }
)
</script>

<template>
  <div
    v-if="enabled && cursors"
    class="absolute pointer-events-none left-0 top-0 w-full h-full overflow-hidden z-10"
  >
    <div
      v-for="cursor in cursors"
      :key="cursor.id"
      class="absolute pointer-events-none transition-transform"
      :style="{ transform: `translate(${(cursor.x / 100) * width}px, ${(cursor.y / 100) * height}px)`, left: 0, top: 0 }"
    >
      <Icon
        name="lucide:mouse-pointer-2"
        size="20"
      />
      {{ cursor.x }}, {{ cursor.y }}
    </div>
  </div>
  <div
    v-if="cursors"
    class="fixed right-3.5 bottom-3.5"
  >
    <div>
      <div
        v-if="enabled"
        class="flex flex-col items-end"
      >
        <p>{{ x }}({{ width }}) x {{ y }}({{ height }})</p>
        {{ sessionId }}
      </div>
      <div class="flex items-center justify-end">
        {{ enabled ? cursors.length : '?' }} x
        <Icon
          name="lucide:mouse-pointer-2"
          size="22"
        />
        <USwitch v-model="enabled" />
      </div>
    </div>
  </div>
</template>
