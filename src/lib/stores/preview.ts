import { writable } from 'svelte/store';

export const initValues = {
	query: '',
	fontSize: 40,
	customText: '',
	viewMode: 'grid'
};

export const preview = writable({ ...initValues });

export const reset = () => preview.set({ ...initValues });
