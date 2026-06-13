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
    pdf: z.string().optional(),     // path to PDF in /papers/, e.g. "my-paper.pdf"
    notes: z.boolean().default(false),
  }),
});

export const collections = { blogs, papers };
