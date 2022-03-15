import { writable } from 'svelte/store';

const initValues = {
	isSidebarOpen: false
};

export const settings = writable(initValues);

export const toggle = () => {
	settings.update((value) => {
		return { ...value, isSidebarOpen: !value.isSidebarOpen };
	});
};
