import React from 'react';
import { Action } from './cache-types'
const _Mount = (_:{cacheId: string, element : JSX.Element})=>{};

const defaultValue = {
    mount: _Mount,
    cacheStates: {},
    // eslint-disable-next-line no-empty-pattern
    dispatch: ({}:Action)=>{},
    handleScroll: (cacheId: any,event: any)=>{}
}
export type DefaultValue = typeof defaultValue;
export type Mount = typeof _Mount;
const CacheContext = React.createContext<DefaultValue>(defaultValue);
export default CacheContext;