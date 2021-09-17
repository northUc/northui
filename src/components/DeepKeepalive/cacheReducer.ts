import *  as cacheTypes from './cache-types';
type Payload = {
    cacheId: string,
    doms?: any,
    element?: React.ReactElement,
    reactElement?: React.ReactElement,
}
type CacheStates = {
    cacheId?: string,
    element?: React.ReactElement,
    status?: cacheTypes.ALLTYPES,
    [_: string]: any,
};



function cacheReducer(cacheStates:CacheStates={},  action:{type:cacheTypes.ALLTYPES, payload:Payload}) {
    let payload = action.payload;
    let cacheId = payload.cacheId;
    switch (action.type) {
        case cacheTypes.CREATE:
            return { ...cacheStates,
                [payload.cacheId]: {
                    cacheId,//缓存ID
                    reactElement: payload.reactElement,//要渲染的虚拟DOM
                    doms: undefined,//此虚拟DOM对应的真实DOM
                    status: cacheTypes.CREATE,//缓存的状态是创建
                    scrolls:{}//滚动信息保存对象，默认为是key滚动的DOM 值是滚动的位置
                } };
        case cacheTypes.CREATED:
            return { ...cacheStates,
                [payload.cacheId]: {
                    ...cacheStates[payload.cacheId],
                    doms:payload.doms,
                    status:cacheTypes.CREATED
                } };   
        case cacheTypes.DESTROY:
            return { ...cacheStates,
                [payload.cacheId]: {
                    ...cacheStates[payload.cacheId],
                    status:cacheTypes.DESTROY
                } };                
        default:
            return cacheStates;
    }
}
export default cacheReducer;