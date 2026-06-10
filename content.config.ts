import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const Github = {
  url: z.string(),
  collaborators: z.array(z.string()).nullable()
}

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.object({
          name: z.string(),
          dark: z.string().nullable()
        })),
        url: z.string().nullable(),
        github: z.object(Github)
          .or(z.object({
            projects: z.array(z.object(Github)),
            collaborators: z.array(z.string())
          }))
          .nullable(),
        image: z.string(),
        date: z.date()
      })
    }),
    todo: defineCollection({
      type: 'page',
      source: 'todo/**/*.md',
      schema: z.object({
        type: z.enum(['Feature', 'Issue']),
        status: z.enum(['Planned', 'In Progress', 'Done', 'Abandoned']),
        icon: z.string().nullable(),
        completed: z.date().nullable()
      })
    })
  }
})
