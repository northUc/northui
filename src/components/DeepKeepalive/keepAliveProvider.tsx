import React, { useReducer, useCallback, PropsWithChildren } from "react";
import CacheContext,{Mount} from './cacheContext';
import cacheReducer from './cacheReducer';
import * as cacheTypes from './cache-types';
type Props = {
};

type CacheState = {
    doms: HTMLElement[],
    status: cacheTypes.ALLTYPES
}
export function KeepAliveProvider(props:PropsWithChildren<Props>) {
    let [cacheStates, dispatch] = useReducer(cacheReducer, {});
    const mount:Mount = useCallback(({ cacheId, element }) => {
        if(cacheStates[cacheId]){
            let cacheState = cacheStates[cacheId] as CacheState;
            if(cacheState.status === cacheTypes.DESTROY){
                let doms = cacheState.doms;//获取 到老的真实DOM
                doms.forEach(dom=>dom.parentNode?.parentNode&&dom.parentNode.parentNode.removeChild(dom));
                dispatch({type:cacheTypes.CREATE,payload:{cacheId,element}});//创建缓存，开始代
            }
        }else{
            dispatch({type:cacheTypes.CREATE,payload:{cacheId,element}});//创建缓存，开始代孕
        }
       
    }, [cacheStates]);
    let handleScroll = useCallback((cacheId,event)=>{
        if(cacheStates[cacheId]){
            let target = event.target;
            let scrolls = cacheStates[cacheId].scrolls;
            scrolls[target]=target.scrollTop;
        }
    },[cacheStates]);
    return (
        <CacheContext.Provider value={{ mount, cacheStates, dispatch , handleScroll}}>
            {props.children}
            {Object.values(cacheStates).map(({ cacheId, element }) => (
                <div
                    id={`cache_${cacheId}`}
                    key={cacheId}
                    ref={(dom) => {
                        let cacheState = cacheStates[cacheId];
                        if (dom && (!cacheState.doms)) {
                            let doms = Array.from(dom.childNodes);
                            dispatch({ type: cacheTypes.CREATED, payload: { cacheId, doms } });
                        }
                    }}
                >{element}</div>
            ))}
        </CacheContext.Provider>
    );
}
export default KeepAliveProvider;