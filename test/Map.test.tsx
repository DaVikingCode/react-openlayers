import React from "react";
import * as ReactDOM from "react-dom";
import { Default as Map } from "../stories/Map.stories";

describe("Map", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<Map />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
