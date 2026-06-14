import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogs = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    authors: z.string(),
    venue: z.string().optional(),
    year: z.number(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    pdf: z.string().optional(),
    notes: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blogs, papers, projects };
