<script setup lang="ts">
import GithubRepository from '~/components/GithubRepository.vue'
import GithubUser from '~/components/GithubUser.vue'

const slug = useRoute().params.slug
const { data } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').path(`/projects/${slug}`).first()
})
</script>

<template>
  <UError
    v-if="!data"
    :error="{
      statusCode: 404,
      statusMessage: 'Page not found',
      message: 'This project does not exist.'
    }"
  />
  <UPage
    v-else
    class="p-3 lg:p-0"
  >
    <UPageHeader
      :title="data.title"
      :description="data.description"
    />
    <template #left>
      <div />
    </template>

    <UPageBody>
      <ContentRenderer :value="data" />
    </UPageBody>

    <template #right>
      <div class="mt-6 flex flex-col items-center lg:items-start">
        <div class="flex flex-wrap gap-1 w-fit">
          <ThemeIcon
            v-for="tag in data.tags"
            :key="tag.name"
            :name="tag.name"
            :dark="tag.dark ?? undefined"
            class="size-7"
          />
        </div>
        <div
          v-if="data.github"
          class="my-1.5"
        >
          <GithubRepository
            v-if="'url' in data.github"
            :url="data.github.url"
          />
          <div v-if="'url' in data.github">
            <h4
              v-if="data.github.collaborators"
              class="mb-1"
            >
              Collaborators
            </h4>
            <GithubUser
              v-for="(collaborator, index) in data.github?.collaborators"
              :key="index"
              :username="collaborator"
            />
          </div>
          <div v-else>
            <!-- Collaborators -->
            <h4 class="mb-1">
              Collaborators
            </h4>
            <GithubUser
              v-for="(collaborator, index) in data.github?.collaborators"
              :key="index"
              :username="collaborator"
            />
            <!-- Projects w collaborators -->
            <h4 class="my-1">
              Projects and Collaborators
            </h4>
            <div
              v-for="project in data.github?.projects"
              :key="project.url"
              class="my-1"
            >
              <USeparator />
              <GithubRepository
                :url="project.url"
                :name="project.url.substring(project.url.lastIndexOf('/'))"
              />
              <GithubUser
                v-for="(collaborator, index) in project.collaborators"
                :key="index"
                :username="collaborator"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPage>
</template>
