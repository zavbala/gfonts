export interface Font {
	thickness: number;
	slant: number;
	width: number;
	lineHeight: number;
}

export interface Specimen {
	family: string;
	displayName: string | null;
	category: string;
	size: number;
	subsets: string[];
	designers: string[];
	fonts: {
		[weight: string]: Font;
	};
}

export interface FamilyTree {
	[family: string]: string[];
}

export interface Family {
	name: string;
	styles: string[];
}

export interface Item {
	[key: string]: {
		italic: string[];
		normal: string[];
	};
}

export type Style = [string, number, 'Italic' | ''];

export type Icons =
	| 'X'
	| 'Search'
	| 'Plus'
	| 'Sun'
	| 'Moon'
	| 'Grid'
	| 'Minus'
	| 'ChevronDown'
	| 'ChevronUp'
	| 'Refresh'
	| 'Duplicate';
