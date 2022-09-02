import { FC } from "react";
import { DrawEvent, Options } from "ol/interaction/Draw";
declare type DrawProps = {
    active?: boolean;
    options: Options;
    onDrawEnd?: (evt: DrawEvent) => void;
    onDrawStart?: (evt: DrawEvent) => void;
};
export declare const Draw: FC<DrawProps>;
export {};
