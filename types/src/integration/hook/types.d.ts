export type TList<T = any> = {
    [name: string]: T;
};
export type TSubscriber = {
    hook?: any;
    format?: Function;
};
export type TTarget = {
    /**
     * - A unique identifier for each hook.
     */
    id?: string | number;
    /**
     * - The name of the event that triggers the hook.
     */
    event: string;
    /**
     * - alias for the notifier field
     */
    target?: string;
    /**
     * -  A handler that processes the event data specified in the value field. Common notifiers include "Locator" for local services, web hooks for external services, and email senders.
     */
    notifier?: string;
    /**
     * - The data used by the notifier.
     */
    value?: string;
    /**
     * - Defines a mapping expression to transform event parameters into those expected by the processing service, ensuring compatibility.
     */
    param?: string;
    /**
     * - Provides alternative notifier if the expression fails. It is required if it is necessary to take an alternative path of action.
     */
    notifier_alt?: string;
    /**
     * - Provides alternative notifier value if the expression fails. In case it is not specified, it will take the value of the value field.
     */
    value_alt?: string;
    /**
     * - Provides alternative mappings if the expression fails. In case it is not specified, it will take the value of the param field.
     */
    param_alt?: string;
    /**
     * - Determines if the notifier should be executed based on the expression field. The "Native" processor evaluates JavaScript expressions.
     */
    processor?: string;
    /**
     * - A logical expression evaluated by the processor.
     */
    expression?: string;
    /**
     * - A tag for grouping related hooks.
     */
    group?: string;
    /**
     * - Indicates whether the hook is active (1) or inactive (0).
     */
    status?: string | number;
    /**
     * - Provides semantic annotations without impacting logic.
     */
    note?: string;
};
export type TSubscription = {
    data?: any;
    value?: any;
    scope?: number | string | null;
    mode?: number;
    event?: string;
    param?: string;
    notifier?: string;
    subscriber?: string | string[];
    expression?: string;
    processor?: string;
    group?: string;
    owner?: number;
    status?: number;
    id?: number | string;
    date?: Date | number;
    target?: TTarget;
    hook?: any;
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
export type TProcessor = {
    subscriber?: string;
    run: Function;
};
export type TResult = {
    error?: {
        message?: string;
        code?: string;
    };
    result?: any;
};
export type THook = import("./index");
