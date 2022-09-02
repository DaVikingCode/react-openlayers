import { FunctionComponent } from "react";
import { Options } from "ol/layer/BaseVector";
import { BaseLayerProps } from "./base-layer-props";
declare type Props = Options & BaseLayerProps;
declare const VectorLayer: FunctionComponent<Props>;
export default VectorLayer;
export { Props as VectorLayerProps };
