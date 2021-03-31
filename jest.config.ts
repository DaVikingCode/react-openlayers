// jest.config.ts
import type { InitialOptionsTsJest } from "ts-jest/dist/types";
// import { jsWithTsESM as tsjPreset } from 'ts-jest/presets'
// import { defaultsESM as tsjPreset } from 'ts-jest/preset'
// import { jsWithTs as tsjPreset } from 'ts-jest/preset'
// import { jsWithTsESM as tsjPreset } from 'ts-jest/preset'
// import { jsWithBabel as tsjPreset } from 'ts-jest/preset'
import { jsWithBabelESM as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
	// [...]
	preset: "ts-jest",
	// extensionsToTreatAsEsm: [".ts"],
	// transform: {
	//   ...tsjPreset.transform,
	//   // [...]
	// },
};

export default config;
