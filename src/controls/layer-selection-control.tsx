import React, {useContext, useEffect, useState} from "react";
import {MapContext} from "../map";
import {unByKey} from "ol/Observable";
import BaseLayer from "ol/layer/Base";
import {debounce} from "lodash";
import { Collection } from "ol";

// import style from './layer-selection-control.css';

type Props<P> = {
    Container: React.ComponentType<P>,
    LayerSelection?: React.ComponentType<LayerSelectionProps>
}

type LayerSelectionProps = {
    layerName: string,
    show: boolean,
    onHide: () => void,
    onShow: () => void
};

function DefaultLayerSelection(props: LayerSelectionProps) {
	return <div>
		<span>{props.layerName}</span>
		<button onClick={() => props.show
			? props.onHide()
			: props.onShow()}>
            Hide/Show
		</button>
	</div>;
}

export function LayerSelectionControl({Container, LayerSelection = DefaultLayerSelection}: Props<any>) {
	const map = useContext(MapContext);
	const [layers, setLayers] = useState<BaseLayer[] | null>(null);

	useEffect(() => {
		if (!map) return;
		const layerGroup = map.getLayerGroup();
        
		const evtKey = layerGroup.on("change", debounce(evt => {
			const _layers: Collection<BaseLayer> = evt?.target?.values_?.layers;

			setLayers([..._layers.getArray()]);
		}, 50));

		return () => {
			unByKey(evtKey);
		};
	});

	useEffect(() => {
		if (!map) return;
		const layers = map.getLayers();
		setLayers(layers.getArray());
	}, [map]);

	return (
		<Container>
			{layers?.map(layer => (
				<LayerSelection
					key={(layer as any).ol_uid}
					layerName={layer.getProperties().name}
					onHide={() => layer.setVisible(false)}
					onShow={() => layer.setVisible(true)}
					show={layer.getVisible()}
				/>
			))}
		</Container>
	);
}
