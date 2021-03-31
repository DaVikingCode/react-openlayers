import React, { FunctionComponent, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../map";
import style from "./controls.css";

export const Controls: FunctionComponent = ({ children }) => {
	const map = useContext(MapContext);
	const [overlay, setOverlay] = useState<Element | null>();

	if (map && !overlay) {
		setOverlay(map
			.getTargetElement()
			.querySelector(".ol-overlaycontainer-stopevent")
		);
	}

	return overlay
		? ReactDOM.createPortal(
			<div className={style.controls}>{children}</div>,
			overlay
		)
		: null;
};
