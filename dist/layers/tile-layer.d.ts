import React from "react";
import OLTileLayer from "ol/layer/Tile";
import { Options } from "ol/layer/BaseTile";
import { BaseLayerProps } from "./base-layer-props";
declare type Props = BaseLayerProps & {
    options: Options;
    onLayerAdded?: (layer: OLTileLayer) => void;
};
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
export { Props as TileLayerProps };
