import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initValues = {
	darkMode: false,
	isSidebarOpen: false
};

const stored =
	browser && JSON.parse(window.localStorage.getItem('settings') || JSON.stringify(initValues));
export const settings = writable(stored);

settings.subscribe((values) => {
	if (browser) return (window.localStorage.settings = JSON.stringify(values));
});

export const toggle = (key: string) => {
	settings.update((values) => {
		return { ...values, [key]: !values[key] };
	});
};
