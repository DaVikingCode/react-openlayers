import { ViewOptions } from "ol/View";
import { View as OlView } from "ol";
import { FC, useContext, useEffect, useState } from "react";
import { MapContext } from "./map-context";
import { useEvent } from "../events/use-event";
import { ObjectEvent } from "ol/Object";

type Props = {
	options: ViewOptions,
	onChangeCenter?: (evt: ObjectEvent) => void;
	onChangeResolution?: (evt: ObjectEvent) => void;
	onChangeRotation?: (evt: ObjectEvent) => void;
	onChange?: (evt: ObjectEvent) => void;
	onChangeProperty?: (evt: ObjectEvent) => void;
	onError?: (evt: ObjectEvent) => void;
}

export const View: FC<Props> = ({ options, onChangeCenter, onChangeResolution, onChangeRotation, onChangeProperty, onError, onChange }) => {
	const map = useContext(MapContext);
	const [view, setView] = useState<OlView>();

	useEffect(() => {
		if (!map) return;

		if (view) {
			view.applyOptions_(options);
			return;
		}

		const _view = new OlView(options);
		map.setView(_view);
		setView(_view);
	}, [map, options]);

	useEvent("change:center", onChangeCenter, view);
	useEvent("change:resolution", onChangeResolution, view);
	useEvent("change:rotation", onChangeRotation, view);
	useEvent("propertychange", onChangeProperty, view);
	useEvent("error", onError, view);
	useEvent("change", onChange, view);

	return null;
};

export default View;
