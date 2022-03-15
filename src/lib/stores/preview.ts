import { writable } from 'svelte/store';

const initValues = {
	fontSize: 32,
	customText: '',
	query: ''
};

export const preview = writable(initValues);
