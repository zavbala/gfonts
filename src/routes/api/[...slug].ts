import type { RequestEvent } from '@sveltejs/kit';
import FontsJSON from '../../../static/fonts.json';
import fs from 'fs';

const OFFSET = 12;

export const get = async (event: RequestEvent) => {
	const {
		params,
		url: { searchParams }
	} = event;

	const [path, fontId] = params.slug.split('/');
	let bounds = [];
	let query = '';

	for (const [key, value] of searchParams) {
		switch (key) {
			case 'page':
				bounds = [OFFSET * (Number(value) - 1), OFFSET * Number(value)];
				break;
			case 'query':
				query = value;
				break;
		}
	}

	if (path !== 'fonts') {
		return {
			status: 404,
			body: {
				detail: ''
			}
		};
	}

	const entry = FontsJSON['familyMetadataList'];

	if (query) {
		const searchedData = entry.filter((value) => value.family.includes(query));

		return {
			body: {
				items: searchedData
			}
		};
	}

	if (fontId) {
		const splitByHyphen = fontId.split('-');
		const family = splitByHyphen.length > 1 ? splitByHyphen.join(' ') : fontId;
		const filteredByID = entry.filter((font) => font.family === family);

		if (filteredByID.length) {
			return {
				body: {
					...filteredByID[0]
				}
			};
		} else {
			return {
				status: 404,
				body: {
					detail: 'Item not found'
				}
			};
		}
	}

	const { mtime } = fs.statSync('./static/fonts.json');

	return {
		body: {
			last_update: mtime,
			items: entry.slice(...bounds),
			pages: Math.floor(entry.length / OFFSET)
		}
	};
};
