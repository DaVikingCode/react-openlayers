import { FC } from "react";
import { ModifyEvent, Options } from "ol/interaction/Modify";
declare type ModifyProps = {
    active?: boolean;
    options: Options;
    onModifyEnd?: (event: ModifyEvent) => void;
};
export declare const Modify: FC<ModifyProps>;
export {};
