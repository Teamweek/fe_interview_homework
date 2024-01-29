import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting/index.js';

export default {
	plugins: [
		//TODO: Should we specify paths to make faster?
		postcssImport({
			skipDuplicates: true,
		}),
		tailwindNesting,
		tailwindcss,
		postcssPresetEnv({
			features: {
				'nesting-rules': false,
				'focus-within-pseudo-class': false,
				'image-set-function': false,
			},
		}),
	],
};
