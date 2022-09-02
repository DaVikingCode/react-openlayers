import React, { FC } from "react";
export declare type FullScreenProps = {
    fullScreen: boolean;
    setFullScreen: () => void;
    exitFullScreen: () => void;
};
interface Props {
    CustomControl?: React.ComponentType<FullScreenProps>;
}
export declare const FullScreenControl: FC<Props>;
export {};
