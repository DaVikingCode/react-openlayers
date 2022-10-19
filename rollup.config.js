/* eslint-disable import/no-anonymous-default-export */
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import svgr from "@svgr/rollup";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { eslint } from "rollup-plugin-eslint";
import autoprefixer from "autoprefixer";
import path from 'path'

export default [
	// CommonJS
	{
		input: "src/index.tsx",
		external: ["./lib/style.css", "lodash"],
		output: {
			dir: "./",
			entryFileNames: "lib/cjs/index.js",
			format: "cjs",
			globals:{
				"lodash": "_"
			}
		},
		plugins: [
			del({ targets: "lib/*" }),
			typescript({
				tsconfig: "./tsconfig.lib.json",
				declaration: true,
				declarationDir: "types/",
				rootDir: "src/",
				noEmit: true
			}),
			peerDepsExternal(),
			resolve({
				jsnext: true,
				main: true,
				browser: true,
			}),
			svgr(),
			commonjs({
				include: "node_modules/**",
				namedExports: {
					"node_modules/rc-util/node_modules/react-is/index.js": ["isFragment", "useMemo", "isMemo"],
					"node_modules/react-is/index.js": ["isFragment", "useMemo", "isMemo"]
				}
			}),
			postcss({
				extensions: ['.css'],
				extract: path.resolve("lib/style.css"),
				modules: true,
				plugins: [autoprefixer()],
			}),
			nodeResolve({
				extensions: ['.css']
			}),
			eslint({
				exclude: [
					"src/styles/*.css"
				]
			})
		]
	},
];
