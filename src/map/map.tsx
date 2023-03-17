import React, {
	useRef,
	useState,
	useEffect,
	FunctionComponent,
	MutableRefObject,
} from "react";
import { MapContext } from "./map-context";
import * as ol from "ol";
import { useEvent } from "../events/use-event";

type MapRef = ol.Map | undefined;

export interface MapProps {
	mapRef?: MutableRefObject<ol.Map>;
	onMouseMove?: (event: any) => void;
}

export const Map: FunctionComponent<MapProps> = ({
	children,
	onMouseMove,
	mapRef,
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
			<div ref={mapEl} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	);
};
