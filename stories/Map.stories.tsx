import React from "react";
import { Meta, Story } from "@storybook/react";
import OSM from "ol/source/OSM";
import {
	Controls,
	FullScreenControl,
	Layers,
	Map,
	TileLayer,
	View,
} from "../src";
import { MapProps } from "../src/map/map";

const meta: Meta = {
	title: "Map",
	component: Map,
	argTypes: {},
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

const Template: Story<MapProps> = (args) => (
	<Map {...args}>
		<View options={{ center: [0, 0], zoom: 2 }} />
		<Layers>
			<TileLayer options={{ source: new OSM() }} />
		</Layers>
	</Map>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

const WithZoomTemplate: Story<MapProps> = (args) => (
	<Map {...args}>
		<View options={{ center: [0, 0], zoom: 2 }} />
		<Layers>
			<TileLayer options={{ source: new OSM() }} />
		</Layers>
		<Controls>
			<FullScreenControl />
		</Controls>
	</Map>
);

export const WithZoom = WithZoomTemplate.bind({});
