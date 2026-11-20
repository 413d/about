import type { AppLang } from '@/lib/content';

export type AppMode = 'stories' | 'text';

export interface UiLabels {
	next: string;
	prev: string;
	pause: string;
	resume: string;
	viewTextVersion: string;
	readTextSummary: string;
	startOver: string;
	emailAlex: string;
	backToStories: string;
	storyCounter: string;
	jumpToLanguage: string;
	noJsHint: string;
	storyExperienceLabel: string;
	keyHints: string;
	flowApi: string;
	flowQueue: string;
	flowData: string;
	goHome: string;
	contactLinks: string;
	contactEmail: string;
}

const labels: Record<AppLang, UiLabels> = {
	en: {
		next: 'Next',
		prev: 'Previous',
		pause: 'Pause',
		resume: 'Resume',
		viewTextVersion: 'Open text summary',
		readTextSummary: 'Read the text summary',
		startOver: 'Start over',
		emailAlex: 'Email Alex',
		backToStories: 'Open interactive portfolio',
		storyCounter: 'Story',
		jumpToLanguage: 'Language',
		noJsHint: 'JavaScript is disabled. Open the text summary for the complete portfolio overview.',
		storyExperienceLabel: 'Interactive engineering portfolio',
		keyHints: 'Use the left and right arrow keys to move between screens, Home and End to jump to the first or last one, and space to pause or resume.',
		flowApi: 'API',
		flowQueue: 'Queue',
		flowData: 'Data',
		goHome: 'Go to home',
		contactLinks: 'Contact links',
		contactEmail: 'Email'
	},
	ru: {
		next: 'Далее',
		prev: 'Назад',
		pause: 'Пауза',
		resume: 'Продолжить',
		viewTextVersion: 'Открыть текстовую версию',
		readTextSummary: 'Читать текстовую версию',
		startOver: 'Начать заново',
		emailAlex: 'Написать Алексу',
		backToStories: 'Открыть интерактивное портфолио',
		storyCounter: 'Экран',
		jumpToLanguage: 'Язык',
		noJsHint: 'JavaScript отключен. Откройте текстовую версию, чтобы посмотреть портфолио полностью.',
		storyExperienceLabel: 'Интерактивное инженерное портфолио',
		keyHints: 'Стрелки влево и вправо переключают экраны, Home и End переносят к первому или последнему, пробел ставит паузу и снимает её.',
		flowApi: 'API',
		flowQueue: 'Очередь',
		flowData: 'Данные',
		goHome: 'На главную',
		contactLinks: 'Способы связи',
		contactEmail: 'Почта'
	}
};

function normalizeBasePath(basePath: string): string {
	if (!basePath || basePath === '/') return '';
	return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export function withBasePath(path: string): string {
	const basePath = normalizeBasePath(import.meta.env.BASE_URL);
	if (!basePath) return path;
	if (path === '/') return `${basePath}/`;
	return `${basePath}${path}`;
}

export function getUiLabels(lang: AppLang): UiLabels {
	return labels[lang];
}

export function getModePath(lang: AppLang, mode: AppMode): string {
	if (mode === 'stories') {
		return withBasePath(lang === 'en' ? '/' : '/ru');
	}
	return withBasePath(lang === 'en' ? '/text' : '/text/ru');
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
