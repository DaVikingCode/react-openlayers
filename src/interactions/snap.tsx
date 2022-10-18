import { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "../map";
import * as ol from "ol/interaction";
import { Options } from "ol/interaction/Snap";

type SnapProps = {
	active?: boolean;
	options: Options;
};

export const Snap: FC<SnapProps> = ({ options, active = true }) => {
	const map = useContext(MapContext);
	const [snap, setsnap] = useState<ol.Snap>();

	useEffect(() => {
		if (!map) return;
		const _snap = new ol.Snap(options);
		map.addInteraction(_snap);
		setsnap(_snap);
		return () => {
			map.removeInteraction(_snap);
		};
	}, [map, options]);

	useEffect(() => {
		if (!snap) return;
		snap.setActive(active);
	}, [active, snap]);

	return null;
};
