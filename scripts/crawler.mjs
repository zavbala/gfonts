import { writeFileSync } from 'fs';

const METADATA = 'https://fonts.google.com/metadata/fonts';

fetch(METADATA)
	.then((response) => {
		if (response.ok) return response.json();
	})
	.then((data) =>
		writeFileSync(process.cwd() + '/src/lib/data/Fonts.json', JSON.stringify(data, null, ' '))
	)
	.catch((error) => console.log(error));
