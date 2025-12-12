import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    'draft-chat': z.string().optional(),
  }),
});

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    permalink: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    permalink: z.string(),
    status: z.enum(['ongoing', 'finished']).optional(),
    type: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  notes: notesCollection,
  projects: projectsCollection,
};
