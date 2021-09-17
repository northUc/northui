import React, { useReducer, useCallback, PropsWithChildren } from "react";
import CacheContext,{Mount} from './cacheContext';
import cacheReducer from './cacheReducer';
import * as cacheTypes from './cache-types';
type Props = {
    id: string,
};
function KeepAliveProvider(props:PropsWithChildren<Props>) {
    let [cacheStates, dispatch] = useReducer(cacheReducer, {});
    const mount:Mount = useCallback(({ cacheId, element }) => {
        console.log('---element', element);
        if(!cacheStates[cacheId]){
            // dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } });
        }
    }, [cacheStates]);
    return (
        <CacheContext.Provider value={{ mount, cacheStates, dispatch }}>
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