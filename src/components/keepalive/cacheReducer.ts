import *  as cacheTypes from './cache-types';
type Payload = {
    cacheId: string,
    doms?: any,
    element?: React.ReactElement,
}
type CacheStates = {
    cacheId?: string,
    element?: React.ReactElement,
    status?: cacheTypes.ALLTYPES,
    [_: string]: any,
};

function cacheReducer(cacheStates:CacheStates={}, { type, payload }: {type:cacheTypes.ALLTYPES, payload:Payload}) {
    switch (type) {
        case cacheTypes.CREATE:
            return { ...cacheStates,
                [payload.cacheId]: {
                    cacheId:payload.cacheId,
                    element:payload.element,
                    status:cacheTypes.CREATE
                } };
        case cacheTypes.CREATED:
            return { ...cacheStates,
                [payload.cacheId]: {
                    ...cacheStates[payload.cacheId],
                    doms:payload.doms,
                    status:cacheTypes.CREATED
                } };   
        case cacheTypes.ACTIVE:
            return { ...cacheStates,
                [payload.cacheId]: {
                    ...cacheStates[payload.cacheId],
                    status:cacheTypes.ACTIVE
                } };                
        default:
            return cacheStates;
    }
}
export default cacheReducer;