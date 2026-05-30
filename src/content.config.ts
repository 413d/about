import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

function defineMarkdownCollection<TSchema extends z.ZodTypeAny>(base: string, schema: TSchema) {
	return defineCollection({
		loader: glob({ pattern: '**/*.md', base }),
		schema
	});
}

const storySchema = z.object({
		id: z.string(),
		order: z.number().int().positive(),
		slug: z.string(),
		lang: z.enum(['en', 'ru']),
		duration: z.number().int().nonnegative(),
		eyebrow: z.string(),
		title: z.string(),
		lines: z.array(z.string()).min(1),
		visualVariant: z.enum([
			'hero',
			'text-emphasis',
			'stack-grid',
			'systems-diagram',
			'problem-cards',
			'leadership-signals',
			'growth-path',
			'cta-block'
		]),
		analyticsKey: z.string(),
		accent: z.string().optional(),
		stackItems: z.array(z.string()).optional(),
		highlightItems: z.array(z.string()).optional(),
		ctaLabel: z.string().optional(),
		ctaHref: z.string().optional()
});

const textSchema = z.object({
	lang: z.enum(['en', 'ru']),
	title: z.string(),
	intro: z.string(),
	sections: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			summary: z.string(),
			accentLabel: z.string().optional(),
			items: z.array(
				z.object({
					label: z.string(),
					description: z.string().optional(),
					tags: z.array(z.string()).optional()
				})
			).optional()
		})
	).min(1)
});

const storiesEn = defineMarkdownCollection('./src/content/stories/en', storySchema);

const storiesRu = defineMarkdownCollection('./src/content/stories/ru', storySchema);

const textEn = defineMarkdownCollection('./src/content/text/en', textSchema);

const textRu = defineMarkdownCollection('./src/content/text/ru', textSchema);

export const collections = { storiesEn, storiesRu, textEn, textRu };
