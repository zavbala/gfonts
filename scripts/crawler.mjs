import { writeFile } from 'fs';

const METADATA = 'https://fonts.google.com/metadata/fonts';

fetch(METADATA).then((response) => {
	if (response.ok) {
		console.log(response);
		// writeFile('../static/fonts.json', data.json());
	}
});
