import { FC } from "react";
import OLImageLayer from "ol/layer/Image";
import { Options } from "ol/layer/BaseImage";
import { BaseLayerProps } from "./base-layer-props";
declare type ImageLayerProps = BaseLayerProps & {
    options: Options;
    onLayerAdded?: (layer: OLImageLayer) => void;
};
declare const ImageLayer: FC<ImageLayerProps>;
export default ImageLayer;
export { ImageLayerProps };
