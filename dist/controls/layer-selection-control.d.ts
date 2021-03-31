import React from "react";
declare type Props<P> = {
    Container: React.ComponentType<P>;
    LayerSelection?: React.ComponentType<LayerSelectionProps>;
};
declare type LayerSelectionProps = {
    layerName: string;
    show: boolean;
    onHide: () => void;
    onShow: () => void;
};
export declare function LayerSelectionControl({ Container, LayerSelection }: Props<any>): JSX.Element;
export {};
