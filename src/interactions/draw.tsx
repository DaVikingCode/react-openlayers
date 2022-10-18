import { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "../map";
import * as ol from "ol/interaction";
import { DrawEvent, Options } from "ol/interaction/Draw";
import { useEvent } from "../events/use-event";

type DrawProps = {
	active?: boolean;
	options: Options;
	onDrawEnd?: (evt: DrawEvent) => void;
	onDrawStart?: (evt: DrawEvent) => void;
};

export const Draw: FC<DrawProps> = ({
	options,
	onDrawEnd,
	onDrawStart,
	active = true,
}) => {
	const map = useContext(MapContext);
	const [draw, setDraw] = useState<ol.Draw>();

	useEffect(() => {
		if (!map) return;

		const _draw = new ol.Draw(options);
		map.addInteraction(_draw);
		setDraw(_draw);

		return () => {
			map.removeInteraction(_draw);
		};
	}, [map, options]);

	useEffect(() => {
		if (!draw) return;
		draw.setActive(active);
	}, [active, draw]);

	useEvent("drawend", onDrawEnd, draw);
	useEvent("drawstart", onDrawStart, draw);

	return null;
};
