import { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "../map";
import OLImageLayer from "ol/layer/Image";
import { Options } from "ol/layer/BaseImage";
import { BaseLayerProps } from "./base-layer-props";

type ImageLayerProps = BaseLayerProps & {
	options: Options;
	onLayerAdded?: (layer: OLImageLayer) => void
};

// TODO: Refactor layer creation into a generic one.
const ImageLayer: FC<ImageLayerProps> = ({ options, name, onLayerAdded}) => {
	const map = useContext(MapContext);
	const [layer, setLayer] = useState<OLImageLayer | null>(null);

	useEffect(() => {
		if (!map) return;

		const ImageLayer = new OLImageLayer(options);
		ImageLayer.setProperties({name});
		map.addLayer(ImageLayer);
		setLayer(ImageLayer);
		return () => {
			if (map) {
				map.removeLayer(ImageLayer);
			}
		};
	}, [map, options, name]);

	useEffect(() => {
		if (!layer || !onLayerAdded) return;
		onLayerAdded(layer);
	}, [onLayerAdded, layer]);

	return null;
};

export default ImageLayer;
export type { ImageLayerProps };