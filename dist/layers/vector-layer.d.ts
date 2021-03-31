import { FunctionComponent } from "react";
import { Options } from "ol/layer/BaseVector";
import { BaseLayerProps } from "./base-layer-props";
declare type VectorLayerProps = Options & BaseLayerProps;
export declare const VectorLayer: FunctionComponent<VectorLayerProps>;
export {};
