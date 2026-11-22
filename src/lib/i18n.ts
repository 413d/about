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
				title: 'Senior Fullstack Engineer | SaaS, AI, Web3 & System Architecture',
				description: 'Senior Fullstack Engineer building SaaS platforms, AI integrations, and Web3 products with TypeScript, React, Next.js, Vue, Node.js, NestJS, Hono, and PostgreSQL.'
			}
			: {
				title: 'Senior Fullstack инженер | SaaS, AI, Web3 и архитектура систем',
				description: 'Портфолио Senior Fullstack инженера: SaaS-платформы, AI-интеграции и Web3-продукты на TypeScript, React, Next.js, Vue, Node.js, NestJS, Hono и PostgreSQL.'
			};
	}

	return lang === 'en'
		? {
			title: 'Senior Fullstack Engineer Resume | SaaS, AI, Web3, React, Node.js',
			description: 'Resume summary for hiring managers and clients: Senior Fullstack Engineer with TypeScript, React, Next.js, Vue, Node.js, NestJS, Hono, PostgreSQL, Drizzle, AI, and Web3.'
		}
		: {
			title: 'Резюме Senior Fullstack инженера | SaaS, AI, Web3, React, Node.js',
			description: 'Краткое резюме для найма и проектов: Senior Fullstack инженер (TypeScript, React, Next.js, Vue, Node.js, NestJS, Hono, PostgreSQL, Drizzle, AI и Web3).'
		};
}
