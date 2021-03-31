import { FunctionComponent } from "react";
import "./map.css";
export interface MapProps {
    onMouseMove?: (event: any) => void;
}
export declare const Map: FunctionComponent<MapProps>;
