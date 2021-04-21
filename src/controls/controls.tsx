import React, { FC, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../map";
import style from "./controls.css";

export const Controls: FC = ({ children }) => {
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

export enum ControlPosition {
	TopLeft = "top-left",
	TopRight = "top-right",
	BottomLeft = "bottom-left",
	BottomRight = "bottom-right"
}
const commonStyles: React.CSSProperties = {
	display: "flex",
	pointerEvents: "none",
	gap: "8px",
};

const styles: { [key in ControlPosition]: React.CSSProperties } = {
	[ControlPosition.BottomRight]: {
		...commonStyles,
		gridArea: "bottom-right",
		marginLeft: "auto",
		flexDirection: "column",
		alignItems: "end",
		justifyContent: "end"
	},
	[ControlPosition.BottomLeft]: {
		...commonStyles,
		gridArea: "bottom-left",
		marginRight: "auto",
		flexDirection: "column",
		alignItems: "start",
		justifyContent: "end"
	},
	[ControlPosition.TopLeft]: {
		...commonStyles,
		gridArea: "top-left",
		marginRight: "auto",
		flexDirection: "column",
		alignItems: "start",
	},
	[ControlPosition.TopRight]: {
		...commonStyles,
		gridArea: "top-right",
		marginLeft: "auto",
		flexDirection: "column",
		alignItems: "end",
	}
};

export const Section: FC<{ pos: ControlPosition }> = ({ children, pos }) => {
	return <div style={styles[pos]}>
		{children}
	</div>;
};

