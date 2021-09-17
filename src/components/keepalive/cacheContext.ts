import React from 'react';
// const CacheContext = React.createContext({
//     mount: ()=>{},
//     cacheStates: {},
//     dispatch: {}
// });
const _Mount = (_:{cacheId: string, element : any})=>{};

const defaultValue = {
    mount: _Mount,
    cacheStates: {},
    dispatch: {}
}
export type DefaultValue = typeof defaultValue;
export type Mount = typeof _Mount;
const CacheContext = React.createContext<DefaultValue>(defaultValue);
export default CacheContext;