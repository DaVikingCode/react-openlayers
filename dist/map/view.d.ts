import { ViewOptions } from "ol/View";
import { FC } from "react";
import { ObjectEvent } from "ol/Object";
declare type Props = {
    options: ViewOptions;
    onChangeCenter?: (evt: ObjectEvent) => void;
    onChangeResolution?: (evt: ObjectEvent) => void;
    onChangeRotation?: (evt: ObjectEvent) => void;
    onChange?: (evt: ObjectEvent) => void;
    onChangeProperty?: (evt: ObjectEvent) => void;
    onError?: (evt: ObjectEvent) => void;
};
export declare const View: FC<Props>;
export default View;
export { Props as ViewProps };
