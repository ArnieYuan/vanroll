const fs = require('fs-extra');

(async () => {
	const { deleteSync } = await import('del');
	console.log('Cleaning dist, lib, and docs directories...');
	deleteSync(['dist/**', 'lib/**', 'docs/**']);
	fs.copySync('public', 'dist');
	console.log('Clean complete. Copied public assets to dist.');
})();
