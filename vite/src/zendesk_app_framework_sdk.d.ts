interface ZafGetResponse {
    readonly [key:string]: string;
}
interface User {
    id: number,
    name: string,
    external_id: string,
}

declare module "zendesk_app_framework_sdk" {
    function init(): client;
}
interface client {
    get: (arg: string | string[]) => Promise<ZafGetResponse>;
    set: <T>(triggerName: string, value:T) => Promise<ZafGetResponse>;
    request : (arg : string| Option) => Promise<ZafGetResponse>;
    invoke : (...args:any)=>void;
    on : (eventName:string, callback:EventCallBack)=>void;
}

interface Option{
    url:string;
    method :"POST"|"PUT"|"GET"|"DELETE";
    contentType:"application/json";
    data?:string
}

interface EventCallBack {
    (arg: string): void;
}

