import type { AppLang } from '@/lib/content';

export type AppMode = 'stories' | 'text';

export interface UiLabels {
	next: string;
	prev: string;
	pause: string;
	resume: string;
	viewTextVersion: string;
	backToStories: string;
	storyCounter: string;
	jumpToLanguage: string;
	noJsHint: string;
	storyExperienceLabel: string;
}

const labels: Record<AppLang, UiLabels> = {
	en: {
		next: 'Next',
		prev: 'Previous',
		pause: 'Pause',
		resume: 'Resume',
		viewTextVersion: 'Open text summary',
		backToStories: 'Open interactive portfolio',
		storyCounter: 'Story',
		jumpToLanguage: 'Language',
		noJsHint: 'JavaScript is disabled. Open the text summary for the complete portfolio overview.',
		storyExperienceLabel: 'Interactive engineering portfolio'
	},
	ru: {
		next: 'Далее',
		prev: 'Назад',
		pause: 'Пауза',
		resume: 'Продолжить',
		viewTextVersion: 'Открыть текстовую версию',
		backToStories: 'Открыть интерактивное портфолио',
		storyCounter: 'Экран',
		jumpToLanguage: 'Язык',
		noJsHint: 'JavaScript отключен. Откройте текстовую версию, чтобы посмотреть портфолио полностью.',
		storyExperienceLabel: 'Интерактивное инженерное портфолио'
	}
};

export function getUiLabels(lang: AppLang): UiLabels {
	return labels[lang];
}

export function getModePath(lang: AppLang, mode: AppMode): string {
	if (mode === 'stories') {
		return lang === 'en' ? '/' : '/ru';
	}
	return lang === 'en' ? '/text' : '/text/ru';
}

export function getAlternatePaths(_lang: AppLang, mode: AppMode): Record<AppLang, string> {
	return {
		en: getModePath('en', mode),
		ru: getModePath('ru', mode)
	};
}

export function getPageMeta(lang: AppLang, mode: AppMode): { title: string; description: string } {
	if (mode === 'stories') {
		return lang === 'en'
			? {
				title: 'Senior Fullstack Developer Portfolio | TypeScript, React, Node.js',
				description: 'Senior Fullstack Developer portfolio with TypeScript, React, Node.js, and NestJS expertise focused on architecture ownership and delivery leadership.'
			}
			: {
				title: 'Senior Fullstack разработчик | TypeScript, React, Node.js, NestJS',
				description: 'Портфолио Senior Fullstack разработчика с экспертизой в TypeScript, React, Node.js и NestJS, фокусом на архитектурной ответственности и управляемой поставке.'
			};
	}

	return lang === 'en'
		? {
			title: 'Senior Full Stack Engineer Resume Summary | React, Node.js, TypeScript',
			description: 'Resume summary for recruiters and hiring managers: Senior Full Stack Engineer with React, Node.js, NestJS, architecture ownership, and delivery leadership.'
		}
		: {
			title: 'Резюме Senior Fullstack разработчика | React, Node.js, TypeScript',
			description: 'Краткое резюме для рекрутеров и нанимающих менеджеров: Senior Fullstack разработчик с опытом React, Node.js, NestJS и техлид-ответственности.'
		};
}
