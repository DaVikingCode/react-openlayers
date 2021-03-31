import React, { FC } from "react";
import * as ReactDOM from "react-dom";

import { Layers, Map, TileLayer, View } from "..";
import OSM from "ol/source/OSM";

const App: FC = () => <Map>
	<View options={{ center: [0, 0], zoom: 2 }} />
	<Layers>
		<TileLayer options={{ source: new OSM() }} />
	</Layers>
</Map>;

ReactDOM.render(<App />, document.getElementById("root"));
