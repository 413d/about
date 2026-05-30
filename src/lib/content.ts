import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type StoryEntry = CollectionEntry<'storiesEn'> | CollectionEntry<'storiesRu'>;
type StoryData = StoryEntry['data'];
type TextEntry = CollectionEntry<'textEn'> | CollectionEntry<'textRu'>;
type TextData = TextEntry['data'];

export type AppLang = StoryData['lang'];

export interface NormalizedStory {
	id: string;
	order: number;
	index: number;
	lang: AppLang;
	durationMs: number;
	eyebrow: string;
	title: string;
	lines: string[];
	visualVariant: StoryData['visualVariant'];
	analyticsKey: string;
	accent?: string;
	stackItems?: string[];
	highlightItems?: string[];
	cta?: {
		label: string;
		href: string;
	};
	isTerminal: boolean;
}

export interface SummarySection {
	id: string;
	title: string;
	summary: string;
	accentLabel?: string;
	items?: Array<{
		label: string;
		description?: string;
		tags?: string[];
	}>;
}

export interface TextSummary {
	lang: TextData['lang'];
	title: TextData['title'];
	intro: TextData['intro'];
	sections: SummarySection[];
}

function toDurationMs(duration: number): number {
	if (duration <= 0) return 0;
	if (duration < 100) return duration * 1000;
	return duration;
}

function resolveContactHref(href: string | undefined): string | undefined {
	if (!href) return undefined;
	if (!href.startsWith('mailto:')) return href;
	const configuredEmail = import.meta.env.PUBLIC_CONTACT_EMAIL;
	if (!configuredEmail) return href;
	return `mailto:${configuredEmail}`;
}

export async function getStoriesByLang(lang: AppLang): Promise<NormalizedStory[]> {
	const collection = lang === 'en' ? 'storiesEn' : 'storiesRu';
	const entries = await getCollection(collection, ({ data }) => data.lang === lang);
	const sorted = [...entries].sort((a, b) => a.data.order - b.data.order);

	return sorted.map((entry, index) => {
		const data = entry.data;
		const resolvedHref = resolveContactHref(data.ctaHref);
		const cta = data.ctaLabel && resolvedHref ? { label: data.ctaLabel, href: resolvedHref } : undefined;

		return {
			id: data.id,
			order: data.order,
			index,
			lang: data.lang,
			durationMs: toDurationMs(data.duration),
			eyebrow: data.eyebrow,
			title: data.title,
			lines: data.lines,
			visualVariant: data.visualVariant,
			analyticsKey: data.analyticsKey,
			accent: data.accent,
			stackItems: data.stackItems,
			highlightItems: data.highlightItems,
			cta,
			isTerminal: index === sorted.length - 1 || data.visualVariant === 'cta-block'
		};
	});
}

export async function getTextSummaryByLang(lang: AppLang): Promise<TextSummary> {
	const collection = lang === 'en' ? 'textEn' : 'textRu';
	const entries = await getCollection(collection, ({ data }) => data.lang === lang);
	if (entries.length === 0) {
		throw new Error(`No text summary found for lang: ${lang}`);
	}

	const entry = entries[0].data;
	return {
		lang: entry.lang,
		title: entry.title,
		intro: entry.intro,
		sections: entry.sections
	};
}
