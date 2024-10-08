import React, {
	useRef,
	useState,
	useEffect,
	FunctionComponent,
	MutableRefObject,
} from "react";
import "../styles/map.css";
import { MapContext } from "./map-context";
import * as ol from "ol";
import { useEvent } from "../events/use-event";

type MapRef = ol.Map | undefined;

export interface MapProps {
	mapRef?: MutableRefObject<ol.Map>;
	onMouseMove?: (event: any) => void;
	customCss?: React.CSSProperties;
}

export const Map: FunctionComponent<MapProps> = ({
	children,
	onMouseMove,
	mapRef,
	customCss,
}) => {
	const mapEl = useRef<HTMLDivElement>(null);

	const [map, setMap] = useState<MapRef>(undefined);

	// on component mount
	useEffect(() => {
		if (!mapEl.current) return;
		const options = {
			layers: [],
			controls: [],
			overlays: [],
			renderer: "webgl",
		};
		const mapObject = new ol.Map(options);
		mapObject.setTarget(mapEl.current);
		setMap(mapObject);
		if (mapRef) {
			mapRef.current = mapObject;
		}
		return () => mapObject.setTarget(undefined);
	}, []);

	useEvent("mousemove", onMouseMove, map);

	return (
		<MapContext.Provider value={map}>
			<div ref={mapEl} className="ol-map" style={customCss}>
				{children}
			</div>
		</MapContext.Provider>
	);
};
