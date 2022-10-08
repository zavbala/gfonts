import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initValues = {
	isSidebarOpen: false,
	darkMode: false
};

const stored =
	browser && JSON.parse(window.localStorage.getItem('settings') || JSON.stringify(initValues));

export const settings = writable(stored);

settings.subscribe((value) => {
	if (browser) return (window.localStorage.settings = JSON.stringify(value));
});

export const toggle = (key: string) => {
	settings.update((value) => {
		return { ...value, [key]: !value[key] };
	});
};
