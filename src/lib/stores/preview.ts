import { writable } from 'svelte/store';

const initValues = {
	query: '',
	fontSize: 32,
	customText: '',
	viewMode: 'grid'
};

export const preview = writable(initValues);

export const reset = () => preview.set(initValues);
