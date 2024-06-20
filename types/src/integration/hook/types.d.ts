export type TList<T = any> = {
    [name: string]: T;
};
export type TSubscription = {
    data?: any;
    value?: any;
    event: string;
    param?: string;
    notifier?: string;
    subscriber?: string | string[];
    expression?: string;
    processor?: string;
    group?: string;
    owner?: number;
    status?: number;
    id?: number | string;
    date?: Date;
    /**
     * - formater action to run before process the event but after the subscriber format action
     */
    onPreTrigger?: Function;
    /**
     * - formater action to run after process the event action
     */
    onPosTrigger?: Function;
};
export type TEvent = {
    id?: string | number;
    event: string;
    description?: string;
    payload?: string;
    group?: string;
    status?: string;
};
export type TEmission = {
    subscriber?: string;
    event?: string;
    data?: any;
    date?: number | Date;
    target?: TSubscription;
};
export type THook = import("./index");
