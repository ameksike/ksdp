export = Ioc;
declare class Ioc {
    constructor(cfg: any);
    helper: any;
    run(payload: any): any;
}
