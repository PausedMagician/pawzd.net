<script setup lang="ts">
import GithubUser from '~/components/GithubUser.vue'
import FAQ from '~/components/FAQ.vue'

const { data } = await useAsyncData(`projects`, () => {
  return queryCollection('projects').order('date', 'DESC').all()
})

const leftovers = computed(() => {
  if (data.value) return (3 - (data.value.length % 3)) % 3
  return 0
})
</script>

<template>
  <UContainer>
    <UPageHeader
      title="About me!"
      description="Whatever I felt like disclosing about myself."
    />
    <UPageBody>
      <div class="flex justify-center items-center">
        <ProfileCard />
      </div>
      <UMarquee
        title="Some of my most used technologies"
      >
        <Icon
          name="skill-icons:cpp"
          class="size-12"
        />
        <Icon
          name="skill-icons:cs"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:java-light"
          dark="skill-icons:java-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:python-light"
          dark="skill-icons:python-dark"
          class="size-12"
        />
        <Icon
          name="skill-icons:html"
          class="size-12"
        />
        <Icon
          name="skill-icons:css"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:php-light"
          dark="skill-icons:php-dark"
          class="size-12"
        />
        <Icon
          name="skill-icons:javascript"
          class="size-12"
        />
        <Icon
          name="skill-icons:typescript"
          class="size-12"
        />
        <Icon
          name="skill-icons:rust"
          class="size-12"
        />
      </UMarquee>
      <UMarquee
        :reverse="true"
      >
        <Icon
          name="skill-icons:docker"
          class="size-12"
        />
        <Icon
          name="skill-icons:kubernetes"
          class="size-12"
        />
        <Icon
          name="skill-icons:git"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:laravel-light"
          dark="skill-icons:laravel-dark"
          class="size-12"
        />
        <Icon
          name="skill-icons:jquery"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:vuejs-light"
          dark="skill-icons:vuejs-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:nuxtjs-light"
          dark="skill-icons:nuxtjs-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:react-light"
          dark="skill-icons:react-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:postgresql-light"
          dark="skill-icons:postgresql-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:tailwindcss-light"
          dark="skill-icons:tailwindcss-dark"
          class="size-12"
        />
        <ThemeIcon
          name="skill-icons:tauri-light"
          dark="skill-icons:tauri-dark"
          class="size-12"
        />
        <Icon
          name="skill-icons:sqlite"
          class="size-12"
        />
      </UMarquee>
      <UPageSection
        title="Some other projects"
        description="Other projects made by me? Or with me? With help? Hmm..."
        :links="[{
          label: 'Explore things made by the others!',
          to: '/about/friends',
          color: 'neutral',
          variant: 'subtle',
          trailingIcon: 'i-lucide-arrow-right'
        }]"
      />
      <UPageColumns
        v-if="data"
        class="pb-3"
      >
        <UPageCard
          v-for="(project) in data"
          :key="project.path"
          :to="project.path"
          :title="project.title"
          :ui="{ leadingIcon: 'size-10' }"
          :description="project.description"
          variant="outline"
          spotlight
        >
          <NuxtImg
            v-if="project.image"
            :src="project.image"
          />
          <div
            v-if="project.github"
            class="flex flex-col"
          >
            <GithubUser
              v-for="collaborator in project.github.collaborators"
              :key="collaborator"
              :username="collaborator"
            />
          </div>
          <div class="flex gap-3">
            <ThemeIcon
              v-for="(tag, tagIndex) in project.tags"
              :key="tagIndex"
              :name="tag.name"
              :dark="tag.dark ?? undefined"
              class="size-7"
            />
          </div>
        </UPageCard>
        <UPageCard
          v-for="(i) in leftovers"
          :key="'extra-' + i"
          :title="'Extra filler ' + i"
          description="This filler is attempting to ensure that the spotlight effect doesn't break because of an uneven distribution of cards."
          variant="outline"
          spotlight
        />
      </UPageColumns>
      <FAQ />
    </UPageBody>
  </UContainer>
</template>
