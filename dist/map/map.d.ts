import { FunctionComponent, MutableRefObject } from "react";
import "./map.css";
import * as ol from "ol";
export interface MapProps {
    mapRef?: MutableRefObject<ol.Map>;
    onMouseMove?: (event: any) => void;
}
export declare const Map: FunctionComponent<MapProps>;
