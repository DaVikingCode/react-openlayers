import React, { useRef, useState, useEffect, FunctionComponent } from "react";
import "./map.css";
import { MapContext } from "./map-context";
import * as ol from "ol";
import { useEvent } from "../events/use-event";

type MapRef = ol.Map | undefined;

export interface MapProps {
	onMouseMove?: (event: any) => void;
}

export const Map: FunctionComponent<MapProps> = ({ children, onMouseMove }) => {
	const mapEl = useRef<HTMLDivElement>(null);

	const [map, setMap] = useState<MapRef>(undefined);

	// on component mount  
	useEffect(() => {
		if (!mapEl.current) return;
		const options = {
			layers: [],
			controls: [],
			overlays: []
		};
		const mapObject = new ol.Map(options);
		mapObject.setTarget(mapEl.current);
		setMap(mapObject);
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
