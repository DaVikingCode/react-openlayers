import React from "react";
import OLTileLayer from "ol/layer/Tile";
import { Options } from "ol/layer/BaseTile";
import { BaseLayerProps } from "./base-layer-props";
declare type TileLayerProps = BaseLayerProps & {
    options: Options;
    onLayerAdded?: (layer: OLTileLayer) => void;
};
declare const _default: React.NamedExoticComponent<TileLayerProps>;
export default _default;
