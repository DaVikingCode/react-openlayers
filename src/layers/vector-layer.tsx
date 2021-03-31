import { FunctionComponent, useContext, useEffect } from "react";
import {MapContext} from "../map/map-context";
import OLVectorLayer from "ol/layer/Vector";
import { Options } from "ol/layer/BaseVector";
import { BaseLayerProps } from "./base-layer-props";

type VectorLayerProps = Options & BaseLayerProps;
export const VectorLayer: FunctionComponent<VectorLayerProps> = ({ source, style, zIndex = 0, name }) => {
	const map = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		const vectorLayer = new OLVectorLayer({
			source,
			style
		});
		vectorLayer.setProperties({name});
		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				console.log("new layer");
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, source, style, zIndex, name]);

	return null;
};