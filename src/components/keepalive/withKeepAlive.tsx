import React, { useContext, useRef,useEffect } from "react";
import CacheContext, {DefaultValue} from './cacheContext';

type CacheState = {
    [_: string]: {
        doms:React.ReactDOM[],
    },
}
function withKeepAlive(OldComponent: any, { cacheId = window.location.pathname }): any {
    return function (props: any) {
        const {mount, cacheStates,dispatch } = useContext<DefaultValue>(CacheContext);
        const ref = useRef<typeof OldComponent>();
        useEffect(() => {
            let cacheState = (cacheStates as CacheState)[cacheId] ;
            if(cacheState&&cacheState.doms){
                 let doms = cacheState.doms;
                 doms.forEach((dom: any)=>ref.current.appendChild(dom));
            }else{
                mount({ cacheId, element: <OldComponent /> })
            }
        }, [cacheStates, dispatch, mount, props]);
        return <div id={`keepalive_${cacheId}`} ref={ref} />;
    }
}
export default withKeepAlive;