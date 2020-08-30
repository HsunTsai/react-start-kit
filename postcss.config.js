module.exports = {
	parser: false,
	plugins: {
		'postcss-import': true,
		autoprefixer: {
			browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
		},
		//'cssnano':true
	},
};
