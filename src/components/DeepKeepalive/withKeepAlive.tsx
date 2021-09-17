import React, { useContext, useRef,useEffect } from "react";
import CacheContext, {DefaultValue} from './cacheContext';
import * as cacheTypes from './cache-types';
import uuid from 'uuid';//v3执行会返回一个永远独一无2的值

type CacheState = {
    [_: string]: {
        doms: HTMLElement[],
        status: string,
        scrolls:any
    },
}
// function withKeepAlive(OldComponent: any,{cacheId=uuid.v4(),scroll}): any{
//     return function (props: any) {
//         const {mount, cacheStates,dispatch } = useContext<DefaultValue>(CacheContext);
//         const ref = useRef<typeof OldComponent>();
//         useEffect(() => {
//             let cacheState = (cacheStates as CacheState)[cacheId] ;
//             if(cacheState&&cacheState.doms){
//                  let doms = cacheState.doms;
//                  doms.forEach((dom: any)=>ref.current.appendChild(dom));
//                  if(scroll){
//                     doms.forEach(dom=>{
//                         if(cacheState.scrolls[dom]){
//                             dom.scrollTop = cacheState.scrolls[dom];
//                         }
//                     });
//                 }
//             }else{
//                 mount({ cacheId, element: <OldComponent /> })
//             }
//         }, [cacheStates, dispatch, mount, props]);
//         return <div id={`keepalive_${cacheId}`} ref={ref} />;
//     }
// }
function withKeepAlive(OldComponent: any,{cacheId=uuid.v4(),scroll= false}: any){
    return function(props: JSX.IntrinsicAttributes){
        let {cacheStates,dispatch,mount,handleScroll} = useContext<DefaultValue>(CacheContext);
        let divRef:React.RefObject<typeof OldComponent > = useRef();
        useEffect(()=>{
            let onScroll = handleScroll.bind(null,cacheId);
            if(scroll){
                divRef.current.addEventListener('scroll',onScroll,true);//监听捕获阶段
            }
            return divRef.current.removeEventListener('scroll',onScroll);
        },[handleScroll]);
        useEffect(()=>{
            let cacheState = (cacheStates as CacheState)[cacheId];
            //如果孩子(真实DOM)已经 OK了
            if(cacheState&&cacheState.doms&&cacheState.status !==cacheTypes.DESTROY){
                let doms = cacheState.doms;//出去被代孕的孩子们，
                //divRef.current.parentNode.appendChild(dom);
                doms.forEach(dom=>divRef.current.appendChild(dom));//抱回来作为自己的儿子
                if(scroll){
                    doms.forEach(dom=>{
                        if(cacheState.scrolls[dom.toString()]){
                            dom.scrollTop = cacheState.scrolls[dom.toString()];
                        }
                    });
                }
            }else{//如果孩子还没有，去派生吧
                mount({cacheId,element:<OldComponent {...props} dispatch={dispatch}/>});
            }
        },[cacheStates, dispatch, mount, props]);
        return (
            <div id={`withKeepAlive-$cacheId{}`} ref={divRef}>
                {/*此处需要一个OldComponent渲染出来的真实DOM*/}
            </div>
        )
    }
}
export default withKeepAlive;