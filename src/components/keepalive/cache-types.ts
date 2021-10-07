export const CREATE = 'CREATE';        //创建
export const CREATED = 'CREATED';      //创建成功
export const ACTIVE = 'ACTIVE';        //激活
export const DESTROY = 'DESTROY';//缓存清除

export type ALLTYPES = 'CREATE' | 'CREATED'| 'ACTIVE' | 'DESTROY';


export type Payload = {
    cacheId: string,
    doms?: ChildNode[],
    element?: React.ReactElement,
}
export type CacheStates = {
    cacheId?: string,
    element?: React.ReactElement,
    status?: ALLTYPES,
    doms?: ChildNode[],
    [_: string]: any,
};
export type Action = {
    type:ALLTYPES, payload:Payload
}

// eslint-disable-next-line no-empty-pattern
export type Dispatch = ({}:Action)=>void;