import { FC } from "react";
export declare const MapControls: FC;
export declare enum ControlPosition {
    TopLeft = "top-left",
    TopRight = "top-right",
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right",
    BottomLeftMobile = "bottom-left-mobile",
    BottomRightMobile = "bottom-right-mobile"
}
export declare const Section: FC<{
    pos: ControlPosition;
}>;
