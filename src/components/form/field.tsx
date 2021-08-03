import React from "react";
import FieldContext from './fieldContext';

type Props = {
    name: string,
    children: React.ReactElement,
}
type State = {}
/**
 * 字段的组建
 * 类组建是如何获取上下文的值
 * 实现双向数据绑定
 * input的值是 formInstance.store 对应的字段值
 * 当input的值发生改变的时候要把值放到 formInstance.store上
 */
class Field extends React.Component<Props,State>{
    static contextType = FieldContext; // this.contexy 获取 Provider里面的value
    getContrilled = (childrenProps:React.ReactElement) =>{
        const {name} = this.props;
        const {getFieldValue, setFieldValue} = this.context;
        return {
            ...childrenProps,
            value:getFieldValue(name),
            onChange:(event:React.FormEvent<HTMLFormElement>)=>{
                console.log('==>1111',event.target.value);
                setFieldValue(name,event.target.value)
            }
        }
    }
    render(){
        let children = this.props.children;
        return React.cloneElement(
            children as React.ReactElement,
            this.getContrilled((children as React.ReactElement).props))
    }
}

export default Field;