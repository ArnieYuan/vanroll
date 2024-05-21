const ghpages = require('gh-pages');

ghpages.publish(
	'dist',
	{
		repo: 'https://github.com/arnieyuan/vanroll.git',
		message: 'published https://arnieyuan.github.io/vanroll/',
	},
	function(err) {
		if (err) {
			console.error(err);
		} else {
			console.log('published https://arnieyuan.github.io/vanroll/');
		}
	},
);
