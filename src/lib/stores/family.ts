import type { FamilyTree } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

type Node = [string, number];

type FamilyStore = {
	subscribe: Writable<FamilyTree>['subscribe'];
	[fn: string]: (any) => void;
};

const { subscribe, update } = writable({});

const createFamily = (): FamilyStore => {
	return {
		subscribe,
		add: (node: Node) => {
			const [variant, weight] = node;

			update((value) => {
				const styles = value[variant] ?? [];

				if (!styles.includes(weight)) {
					return {
						...value,
						[variant]: [...styles, weight]
					};
				}

				return { ...value };
			});
		},

		// remove one style
		remove: (node: Node) => {
			const [variant, index] = node;

			update((value) => {
				const styles = value[variant];
				styles.splice(index, 1);

				if (!styles.length) {
					const copy = value;
					delete copy[variant];

					return {
						...copy
					};
				}

				return {
					...value,
					[variant]: [...styles]
				};
			});
		},

		// remove all styles
		restore: (variant: string) => {
			update((value) => {
				const copy = value;
				delete copy[variant];

				return {
					...copy
				};
			});
		}
	};
};

export const family = createFamily();
