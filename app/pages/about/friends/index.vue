<template>
  <UContainer>
    <UPageHeader
      title="Friendly project"
      description="Projects made by my friends"
    />
    <UPageBody>
      <UPageSection
        title="JustAVirus"
        description="This guy makes things!"
        orientation="horizontal"
        :links="[{
          label: 'Check out his website!',
          to: 'https://free-virus.net/',
          color: 'error',
          variant: 'subtle',
          trailingIcon: 'i-lucide-arrow-right'
        }]"
        :features="[
          {
            title: 'Websites!',
            description: 'Whatever that means!',
            icon: 'lucide:app-window'
          },
          {
            title: 'Bricks!!!',
            description: 'Bricks!!!',
            icon: 'twemoji:brick',
            ui: {
              title: 'underline decoration-dashed'
            },
            to: 'https://brick.free-virus.net/'
          }
        ]"
      >
        <template #description>
          <p class="text-muted">
            This guy makes things!
          </p>
          <GithubUser username="NotJustAVirus" />
        </template>
        <iframe
          class="aspect-video w-full zoom-50"
          src="https://free-virus.net"
        />
      </UPageSection>
    </UPageBody>
  </UContainer>
</template>
