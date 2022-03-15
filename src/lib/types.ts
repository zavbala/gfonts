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

export type Style = [string, number, 'Italic' | ''];

export type Icons =
	| 'X'
	| 'Search'
	| 'Plus'
	| 'Sun'
	| 'Grid'
	| 'Minus'
	| 'ChevronDown'
	| 'ChevronUp'
	| 'Duplicate';
