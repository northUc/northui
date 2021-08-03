import React from 'react';
interface callbacks {
    onFinish?:(v:{})=>{}
}

type ForceUpdate = () => void

class FormStore {
    store:{
        [_:string]:any
    }
    callbacks: callbacks
    forceUpdate:ForceUpdate

    constructor(forceUpdate:ForceUpdate){
        this.forceUpdate = forceUpdate
        this.store = {};// 他就是用来存放表单值的对象
        this.callbacks = {};
    }
    setFieldsValue = (newStore:{}) => {
        this.store = {...this.store,...newStore}// 把 newStore里面的属性都赋值给this.store
    }
    setFieldValue = (name:string,value:any) => {
        this.store[name] = value;
    }
    getFieldValue = (name:string) => {
        return this.store[name];// 获取store中的某个属性名的值
    }
    getFieldsValue = () => {
        return this.store;// 获取store中的某个属性名的值
    }
    setCallbacks = (callbacks:{}) =>{
        this.callbacks = callbacks
    }
    submit = () => {
        let { onFinish } = this.callbacks;
        console.log('==>1')
        if(onFinish){
            console.log('==>2')
            onFinish(this.store)
        }
    }
    getForm = () => {
        return {
            setFieldValue:this.setFieldValue,
            setFieldsValue:this.setFieldsValue,
            getFieldValue:this.getFieldValue,
            getFieldsValue:this.getFieldsValue,
            setCallbacks:this.setCallbacks,
            submit:this.submit
        }
    }
}

type TypeFormStore = InstanceType<typeof FormStore>;

// 自定义hooks 就是用一个use开头的函数 里面用到了其他的hooks
export default function useFrom():TypeFormStore[] {
    //{current:null} formRef 可以在多次组建渲染的保持不变 返回是一个对象
    let formRef = React.useRef({});
    // 强行刷新组件的方法 因为对象的属性名有含义  而数组可以任意定义变量名
    let [,forceUpdate] = React.useState({});
    if(formRef.current){
        const forceReRender:ForceUpdate = () => {
            forceUpdate({});// 调用此方法可以让组件刷新
        }
        let formStore = new FormStore(forceReRender);
        let formInstance = formStore.getForm();
        formRef.current = formInstance;
    }
    // 一般来说自定义都会返回数组，因为方便扩展
    return [formRef.current as unknown as TypeFormStore]
}
