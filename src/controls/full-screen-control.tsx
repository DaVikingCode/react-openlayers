import React, { FC, useContext, useEffect, useState } from "react";
import { FullScreen } from "ol/control";
import { Map } from "ol";
import { MapContext } from "../map/map-context";
import style from "./control.css";

import screenfull from "screenfull";

export type FullScreenProps = {
	fullScreen: boolean;
	setFullScreen: () => void;
	exitFullScreen: () => void;
};

interface Props {
	CustomControl?: React.ComponentType<FullScreenProps>;
}

function useDefaultControl(map: Map | undefined, hasCustomControl: boolean) {
	const [defaultControl, setDefaultControl] = useState<HTMLElement | null>(
		null
	);
	useEffect(() => {
		if (!map || hasCustomControl) return;

		const customClassName = "react-full-screen-control";
		const fullScreenControl = new FullScreen({
			className: customClassName,
		});
		// FIXME: Controls are not supposed to be edited after the map has been created.
		// @ts-ignore
		map.controls.push(fullScreenControl);
		const element = map
			.getTargetElement()
			.querySelector("." + customClassName) as HTMLButtonElement;
		setDefaultControl(element);

		return () => {
			// FIXME: Controls are not supposed to be edited after the map has been created.
			// @ts-ignore
			map.controls.remove(fullScreenControl);
		};
	}, [map]);

	return { defaultControl };
}

export const FullScreenControl: FC<Props> = ({ CustomControl }) => {
	const map = useContext(MapContext);
	const hasCustomControl = CustomControl ? true : false;
	const [fullScreen, setFullScreen] = useState<boolean>(false);

	const { defaultControl } = useDefaultControl(map, hasCustomControl);

	const handleFullScreen = async () => {
		if (screenfull.isEnabled) {
			screenfull.request(map?.getTargetElement());
			setFullScreen(true);
		}
	};

	const handleExitFullScreen = async () => {
		if (screenfull.isEnabled) {
			await screenfull.exit();
			setFullScreen(false);
		}
	};

	return CustomControl ? (
		<CustomControl
			fullScreen={fullScreen}
			setFullScreen={handleFullScreen}
			exitFullScreen={handleExitFullScreen}
		/>
	) : (
		<div
			className={style.control}
			ref={(el) => {
				el && defaultControl && el.appendChild(defaultControl);
			}}
		/>
	);
};
