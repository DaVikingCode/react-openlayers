import { Observable } from "ol";
declare type Callback<EventType> = ((evt: EventType) => void) | undefined;
export declare function useEvent<EventType>(eventName: string, callback: Callback<EventType>, observable: Observable | undefined): void;
export {};
