import { ViewOptions } from "ol/View";
import { FC } from "react";
import { ObjectEvent } from "ol/Object";
declare type Props = {
    options: ViewOptions;
    onChangeCenter?: (evt: ObjectEvent) => void;
    onChangeResolution?: (evt: ObjectEvent) => void;
};
export declare const View: FC<Props>;
export default View;
