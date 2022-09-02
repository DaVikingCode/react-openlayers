import React, { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "../map";
import OLTileLayer from "ol/layer/Tile";
import { Options } from "ol/layer/BaseTile";
import { BaseLayerProps } from "./base-layer-props";

type Props = BaseLayerProps & {
	options: Options;
	onLayerAdded?: (layer: OLTileLayer) => void
};
const TileLayer: FC<Props> = ({ options, name, onLayerAdded }) => {
	const map = useContext(MapContext);
	const [layer, setLayer] = useState<OLTileLayer | null>(null);

	useEffect(() => {
		if (!map) return;

		const tileLayer = new OLTileLayer(options);
		tileLayer.setProperties({ name });
		map.addLayer(tileLayer);
		setLayer(tileLayer);
		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map, options, name]);

	useEffect(() => {
		if (!layer || !onLayerAdded) return;
		onLayerAdded(layer);
	}, [onLayerAdded, layer]);

	return null;
};

export default React.memo(TileLayer);
export type { Props as TileLayerProps };