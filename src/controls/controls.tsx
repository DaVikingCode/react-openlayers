import React, { FC, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../map";
import style from "./controls.css";

export const MapControls: FC = ({ children }) => {
	const map = useContext(MapContext);
	const [overlay, setOverlay] = useState<Element | null>();

	if (map && !overlay) {
		setOverlay(
			map
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
	BottomRight = "bottom-right",
	BottomLeftMobile = "bottom-left-mobile",
	BottomRightMobile = "bottom-right-mobile",
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
		alignItems: "flex-end",
		justifyContent: "flex-end",
		gridRowStart: "1",
	},
	[ControlPosition.BottomLeft]: {
		...commonStyles,
		gridArea: "bottom-left",
		marginRight: "auto",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-end",
	},
	[ControlPosition.TopLeft]: {
		...commonStyles,
		gridArea: "top-left",
		marginRight: "auto",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	[ControlPosition.TopRight]: {
		...commonStyles,
		gridArea: "top-right",
		marginLeft: "auto",
		flexDirection: "column",
		alignItems: "flex-end",
	},
	[ControlPosition.BottomRightMobile]: {
		...commonStyles,
		gridArea: "bottom-right",
		marginLeft: "auto",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		gridRowStart: "1",
		marginBottom: "26%",
	},
	[ControlPosition.BottomLeftMobile]: {
		...commonStyles,
		gridArea: "bottom-left",
		marginRight: "auto",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-end",
		marginBottom: "26%",
	},
};

export const Section: FC<{ pos: ControlPosition }> = ({ children, pos }) => {
	return <div style={styles[pos]}>{children}</div>;
};
