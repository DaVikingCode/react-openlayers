import { FC } from "react";
export declare const MapControls: FC;
export declare enum ControlPosition {
	TopLeft = "top-left",
	TopRight = "top-right",
	BottomLeft = "bottom-left",
	BottomRight = "bottom-right",
}
export declare const Section: FC<{
	pos: ControlPosition;
}>;
