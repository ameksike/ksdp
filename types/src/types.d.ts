export type TOptionIoC = {
    /**
     * DEFAULT['DefaultService']
     */
    name?: string;
    namespace?: string;
    /**
     * DEFAULT['instance'] VALUES['module', 'type', 'instance', 'action', 'raw', 'alias', 'lib', 'package']
     */
    type?: string;
    /**
     * DEFAULT['app']
     */
    module?: string;
    /**
     * DEFAULT[null]
     */
    dependency?: string;
    /**
     * DEFAULT[null] only for type ['instance', 'action', 'raw']
     */
    options?: any;
    /**
     * DEFAULT['default'] only for type 'alias'
     */
    source?: string;
    /**
     * DEFAULT[null] only for type 'action'
     */
    propertys?: any;
    /**
     * [OPTIONAL] DEFAULT[null] only for opt.type 'action'
     */
    params?: string;
    /**
     * DEFAULT[type]
     */
    path?: string;
    file?: string;
    id?: string;
    data?: any;
};
