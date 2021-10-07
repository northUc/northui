import *  as cacheTypes from './cache-types';
import { CacheStates, Action } from './cache-types';
function cacheReducer(cacheStates:CacheStates={},  action:Action) {
    let payload = action.payload;
    let cacheId = payload.cacheId;
    switch (action.type) {
        case cacheTypes.CREATE:
            let r = {
                ...cacheStates,
                [cacheId]: {
                    cacheId,//缓存ID
                    element: payload.element,//要渲染的虚拟DOM
                    doms: undefined,//此虚拟DOM对应的真实DOM
                    status: cacheTypes.CREATE,//缓存的状态是创建
                    scrolls:{}//滚动信息保存对象，默认为是key滚动的DOM 值是滚动的位置
                }
            }
            return r
        //表示创建成功，真实DOM已经成功创建    
        case cacheTypes.CREATED:
            return {
                ...cacheStates,
                [cacheId]: {//一个缓存条目
                    ...cacheStates[cacheId],
                    doms: payload.doms,//真实DOM
                    status: cacheTypes.CREATED//缓存的状态是创建成功
                }
            }
        case cacheTypes.DESTROY:
                return {
                    ...cacheStates,
                    [cacheId]: {//一个缓存条目
                        ...cacheStates[cacheId],
                        status: cacheTypes.DESTROY//缓存的状态是销毁 
                    }
                }    
        default:
            return cacheStates;
    }
}
export default cacheReducer;