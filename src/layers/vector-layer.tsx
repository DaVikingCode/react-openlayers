import { FunctionComponent, useContext, useEffect, useState } from "react";
import { MapContext } from "../map/map-context";
import OLVectorLayer from "ol/layer/Vector";
import { Options } from "ol/layer/BaseVector";
import { BaseLayerProps } from "./base-layer-props";

interface VectorLayerProps {
	onLayerChangeVisible?: (visible: boolean) => void;
	onPostRender?: (evt: any) => void;
	updateWhileAnimating?: boolean;
	updateWhileInteracting?: boolean;
}

type Props = Options<any> & BaseLayerProps & VectorLayerProps;
const VectorLayer: FunctionComponent<Props> = ({
	source,
	style,
	zIndex = 0,
	name,
	visible,
	updateWhileAnimating,
	updateWhileInteracting,
	onLayerChangeVisible,
	onPostRender,
}) => {
	const map = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		const vectorLayer = new OLVectorLayer({
			source,
			style,
			visible,
			updateWhileAnimating,
			updateWhileInteracting,
		});
		vectorLayer.setProperties({ name });

		// If function is not null
		if (onLayerChangeVisible) {
			vectorLayer.on("change:visible", (evt) =>
				onLayerChangeVisible(evt.target)
			);
		}

		if (onPostRender) {
			vectorLayer.on("postrender", (evt) => onPostRender(evt));
		}

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, source, style, zIndex, name]);

	return null;
};

export default VectorLayer;
export type { Props as VectorLayerProps };
