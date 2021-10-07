import React, { useContext, useRef,useEffect } from "react";
import CacheContext, {DefaultValue} from './cacheContext';
import * as cacheTypes from './cache-types';
import {v4} from 'uuid';//v3执行会返回一个永远独一无2的值
import { Dispatch } from './cache-types'
type CacheState = {
    [_: string]: {
        doms: HTMLElement[],
        status: string,
        scrolls: {
            [_: string]: number
        }
    },
}

type WrappedComponentProps = {
    dispatch: Dispatch,
}
// React.FC<WrappedComponentProps> | React.ComponentClass<WrappedComponentProps> 实例化之后就 成  JSX.Element类型了
function withKeepAlive(OldComponent: React.FC<WrappedComponentProps> | React.ComponentClass<WrappedComponentProps>,{cacheId=v4(),scroll= false}){
    return function(props: JSX.IntrinsicAttributes){
        let {cacheStates,dispatch,mount,handleScroll} = useContext<DefaultValue>(CacheContext);
        let divRef:React.RefObject<HTMLDivElement> = useRef(null);
        useEffect(()=>{
            let onScroll = handleScroll.bind(null,cacheId);
            if(scroll){
                divRef.current && divRef.current.addEventListener('scroll',onScroll,true);//监听捕获阶段
            }
            if (divRef.current){
                return divRef.current.removeEventListener('scroll',onScroll);
            }
        },[handleScroll]);
        useEffect(()=>{
            let cacheState = (cacheStates as CacheState)[cacheId];
            //如果孩子(真实DOM)已经 OK了
            if(cacheState&&cacheState.doms&&cacheState.status !==cacheTypes.DESTROY){
                let doms = cacheState.doms;//出去被代孕的孩子们，
                //divRef.current.parentNode.appendChild(dom);
                doms.forEach(dom=>divRef.current && divRef.current.appendChild(dom));//抱回来作为自己的儿子
                if(scroll){
                    doms.forEach(dom=>{
                        if(cacheState.scrolls[dom.toString()]){
                            dom.scrollTop = cacheState.scrolls[dom.toString()];
                        }
                    });
                }
            }else{//如果孩子还没有，去派生吧
                const element = <OldComponent {...props} dispatch={dispatch}/>
                mount({cacheId,element});
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