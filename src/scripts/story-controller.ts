interface StoryElements {
	root: Element;
	items: HTMLElement[];
	fills: HTMLElement[];
	counter?: HTMLElement;
	liveRegion?: HTMLElement;
	pauseButtons: HTMLButtonElement[];
	navButtons: HTMLElement[];
	hitZones: HTMLElement[];
}

interface StoryState {
	currentIndex: number;
	isPaused: boolean;
	prefersReducedMotion: boolean;
	storyCount: number;
	startedAtMs: number;
	elapsedMs: number;
	rafId: number | null;
	lang: string;
	viewed: Set<number>;
	touchStartY: number | null;
	touchStartX: number | null;
	counterLabel: string;
}

function getDurationMs(item: HTMLElement): number {
	const raw = Number(item.dataset.storyDuration ?? '6000');
	if (Number.isNaN(raw) || raw < 0) return 6000;
	return raw;
}

function isTerminal(item: HTMLElement): boolean {
	return item.dataset.storyTerminal === 'true';
}

function setFillWidth(fill: HTMLElement | undefined, value: number): void {
	if (!fill) return;
	fill.style.width = `${Math.max(0, Math.min(100, value))}%`;
}

function stopLoop(state: StoryState): void {
	if (state.rafId !== null) {
		cancelAnimationFrame(state.rafId);
		state.rafId = null;
	}
}

function startLoop(elements: StoryElements, state: StoryState): void {
	if (state.rafId !== null) return;
	const loop = (now: number) => {
		runTick(elements, state, now);
		if (state.rafId !== null) {
			state.rafId = requestAnimationFrame(loop);
		}
	};
	state.rafId = requestAnimationFrame(loop);
}

function syncPlayback(elements: StoryElements, state: StoryState): void {
	const activeItem = elements.items[state.currentIndex];
	const shouldRun = Boolean(activeItem) && !state.isPaused && !isTerminal(activeItem);
	if (shouldRun) {
		startLoop(elements, state);
		return;
	}
	stopLoop(state);
}

function activateIndex(elements: StoryElements, state: StoryState, index: number): void {
	const bounded = Math.max(0, Math.min(index, state.storyCount - 1));
	state.currentIndex = bounded;
	state.elapsedMs = 0;
	state.startedAtMs = performance.now();

	elements.items.forEach((item, idx) => {
		const active = idx === bounded;
		item.dataset.active = active ? 'true' : 'false';
		item.classList.toggle('opacity-100', active);
		item.classList.toggle('opacity-0', !active);
		item.classList.toggle('pointer-events-none', !active);
		item.setAttribute('aria-hidden', active ? 'false' : 'true');
		if (active) {
			item.removeAttribute('inert');
		} else {
			item.setAttribute('inert', '');
		}
	});

	elements.fills.forEach((fill, idx) => {
		if (idx < bounded) setFillWidth(fill, 100);
		if (idx > bounded) setFillWidth(fill, 0);
		if (idx === bounded) setFillWidth(fill, 0);
	});

	const activeItem = elements.items[bounded];
	(elements.root as HTMLElement).dataset.terminalActive = isTerminal(activeItem) ? 'true' : 'false';
	const counterText = `${state.counterLabel} ${bounded + 1} / ${state.storyCount}`;
	if (elements.counter) {
		elements.counter.textContent = counterText;
	}
	if (elements.liveRegion) {
		elements.liveRegion.textContent = `${counterText}: ${activeItem.getAttribute('aria-label') ?? activeItem.dataset.storyId ?? ''}`;
	}

	if (!state.viewed.has(bounded)) {
		state.viewed.add(bounded);
	}

	state.isPaused = isTerminal(activeItem) || state.prefersReducedMotion;
	updatePauseButtons(elements, state.isPaused);
	syncPlayback(elements, state);
}

function updatePauseButtons(elements: StoryElements, paused: boolean): void {
	elements.pauseButtons.forEach((button) => {
		const pauseLabel = button.dataset.storyPauseLabel ?? 'Pause';
		const resumeLabel = button.dataset.storyResumeLabel ?? 'Resume';
		button.textContent = paused ? resumeLabel : pauseLabel;
		button.setAttribute('aria-label', paused ? resumeLabel : pauseLabel);
	});
}

function runTick(elements: StoryElements, state: StoryState, now: number): void {
	if (state.isPaused) return;
	const activeItem = elements.items[state.currentIndex];
	if (!activeItem || isTerminal(activeItem)) return;

	const durationMs = getDurationMs(activeItem);
	state.elapsedMs = now - state.startedAtMs;
	const ratio = durationMs === 0 ? 0 : Math.min(state.elapsedMs / durationMs, 1);
	setFillWidth(elements.fills[state.currentIndex], ratio * 100);

	if (ratio >= 1) {
		activateIndex(elements, state, state.currentIndex + 1);
	}
}

function pause(state: StoryState, elements: StoryElements): void {
	state.isPaused = true;
	updatePauseButtons(elements, true);
	syncPlayback(elements, state);
}

function resume(state: StoryState, elements: StoryElements): void {
	const activeItem = elements.items[state.currentIndex];
	if (!activeItem || isTerminal(activeItem)) return;
	state.isPaused = false;
	state.startedAtMs = performance.now() - state.elapsedMs;
	updatePauseButtons(elements, false);
	syncPlayback(elements, state);
}

function handleNav(action: string, elements: StoryElements, state: StoryState): void {
	if (action === 'prev') {
		activateIndex(elements, state, state.currentIndex - 1);
		return;
	}
	if (action === 'next') {
		activateIndex(elements, state, state.currentIndex + 1);
		return;
	}
	if (action === 'pause') {
		if (state.isPaused) {
			resume(state, elements);
		} else {
			pause(state, elements);
		}
	}
}

export function mountStoryController(root: Element): () => void {
	if (root.getAttribute('data-controller-mounted') === 'true') return () => {};

	const items = Array.from(root.querySelectorAll<HTMLElement>('[data-story-item]'));
	if (items.length === 0) return () => {};

	const elements: StoryElements = {
		root,
		items,
		fills: Array.from(root.querySelectorAll<HTMLElement>('[data-story-progress-fill]')),
		counter: root.querySelector<HTMLElement>('[data-story-counter]') ?? undefined,
		liveRegion: root.querySelector<HTMLElement>('[data-story-live-region]') ?? undefined,
		pauseButtons: Array.from(root.querySelectorAll<HTMLButtonElement>('[data-story-nav="pause"][data-story-control="button"]')),
		navButtons: Array.from(root.querySelectorAll<HTMLElement>('[data-story-nav][data-story-control="button"]')),
		hitZones: Array.from(root.querySelectorAll<HTMLElement>('[data-story-hitzone]'))
	};

	const state: StoryState = {
		currentIndex: Number(root.getAttribute('data-story-initial-index') ?? 0),
		isPaused: false,
		prefersReducedMotion: false,
		storyCount: items.length,
		startedAtMs: performance.now(),
		elapsedMs: 0,
		rafId: null,
		lang: root.getAttribute('data-story-lang') ?? 'en',
		viewed: new Set<number>(),
		touchStartY: null,
		touchStartX: null,
		counterLabel: root.getAttribute('data-story-counter-label') ?? 'Story'
	};

	(root as HTMLElement).dataset.enhanced = 'true';
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	state.prefersReducedMotion = prefersReducedMotion;
	if (prefersReducedMotion) {
		state.isPaused = true;
	}

	activateIndex(elements, state, state.currentIndex);
	requestAnimationFrame(() => {
		(root as HTMLElement).dataset.ready = 'true';
	});

	const cleanups: Array<() => void> = [];

	elements.navButtons.forEach((button) => {
		const onClick = () => {
			const action = button.dataset.storyNav ?? '';
			handleNav(action, elements, state);
		};
		button.addEventListener('click', onClick);
		cleanups.push(() => {
			button.removeEventListener('click', onClick);
		});
	});

	elements.hitZones.forEach((zone) => {
		const onClick = () => {
			const action = zone.dataset.storyHitzone ?? '';
			handleNav(action, elements, state);
		};
		zone.addEventListener('click', onClick);
		cleanups.push(() => {
			zone.removeEventListener('click', onClick);
		});
	});

	const onKeyDown = (event: Event) => {
		const keyboardEvent = event as KeyboardEvent;
		if (keyboardEvent.key === 'ArrowRight' || keyboardEvent.key === 'ArrowDown') {
			handleNav('next', elements, state);
		}
		if (keyboardEvent.key === 'ArrowLeft' || keyboardEvent.key === 'ArrowUp') {
			handleNav('prev', elements, state);
		}
		if (keyboardEvent.key === ' ') {
			event.preventDefault();
			handleNav('pause', elements, state);
		}
	};
	root.addEventListener('keydown', onKeyDown);
	cleanups.push(() => {
		root.removeEventListener('keydown', onKeyDown);
	});

	const onTouchStart = (event: Event) => {
		const touchEvent = event as TouchEvent;
		const touch = touchEvent.changedTouches[0];
		state.touchStartY = touch.clientY;
		state.touchStartX = touch.clientX;
	};
	root.addEventListener('touchstart', onTouchStart);
	cleanups.push(() => {
		root.removeEventListener('touchstart', onTouchStart);
	});

	const onTouchEnd = (event: Event) => {
		if (state.touchStartY === null || state.touchStartX === null) return;
		const touchEvent = event as TouchEvent;
		const touch = touchEvent.changedTouches[0];
		const dy = touch.clientY - state.touchStartY;
		const dx = touch.clientX - state.touchStartX;
		state.touchStartY = null;
		state.touchStartX = null;
		if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx)) return;
		if (dy < 0) handleNav('next', elements, state);
		if (dy > 0) handleNav('prev', elements, state);
	};
	root.addEventListener('touchend', onTouchEnd);
	cleanups.push(() => {
		root.removeEventListener('touchend', onTouchEnd);
	});

	const onVisibilityChange = () => {
		if (document.visibilityState === 'hidden') {
			pause(state, elements);
		}
	};
	document.addEventListener('visibilitychange', onVisibilityChange);
	cleanups.push(() => {
		document.removeEventListener('visibilitychange', onVisibilityChange);
	});

	root.setAttribute('data-controller-mounted', 'true');

	return () => {
		stopLoop(state);
		cleanups.forEach((cleanup) => {
			cleanup();
		});
		root.removeAttribute('data-controller-mounted');
		delete (root as HTMLElement).dataset.ready;
	};
}
