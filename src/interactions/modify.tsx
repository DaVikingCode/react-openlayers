import { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "../map";
import * as ol from "ol/interaction";
import { ModifyEvent, Options } from "ol/interaction/Modify";
import { useEvent } from "../events/use-event";

type ModifyProps = {
    active?: boolean,
    options: Options,
    onModifyEnd?: (event: ModifyEvent) => void
};

export const Modify: FC<ModifyProps> = ({ options, active = true, onModifyEnd }) => {
	const map = useContext(MapContext);
	const [modify, setmodify] = useState<ol.Modify>();

	useEffect(() => {
		if (!map) return;
		const _modify = new ol.Modify(options);
		map.addInteraction(_modify);
		setmodify(_modify);
		return () => {
			map.removeInteraction(_modify);
		};
	}, [map, options]);

	useEffect(() => {
		if (!modify) return;
		modify.setActive(active);
	}, [active, modify]);
    
	useEvent("modifyend", onModifyEnd, modify);

	return null;
};