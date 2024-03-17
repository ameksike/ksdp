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
export type TLoaderOption = {
    /**
     * - module type cjs|mjs
     */
    type?: string;
    /**
     * - export only the default
     */
    auto?: boolean;
    /**
     * - include the default property as the original definition
     */
    fill?: boolean;
    /**
     * - force to clean the cache before load the module
     */
    force?: boolean;
    /**
     * - additional validation to check empty object
     */
    strict?: boolean;
    /**
     * - retry loading module on error
     */
    retry?: number;
    /**
     * - default value to return if there is an error
     */
    default?: any;
    /**
     * - error description if there is an error
     */
    error?: any;
};
