import React from 'react';
import Schema from './async-validator';
import {TypeField} from './field';
interface callbacks {
    onFinish?:(v:{})=>{},
    onFinishFailed?:(v:{})=>{},
}
interface Rules {
    required?:true,
    min?:number,
    max?:number
}

type ForceUpdate = () => void

class FormStore {
    store:{
        [_:string]:any
    }
    callbacks: callbacks
    forceUpdate:ForceUpdate
    fieldEntities: TypeField[];
    constructor(forceUpdate:ForceUpdate){
        this.forceUpdate = forceUpdate
        this.store = {};// 他就是用来存放表单值的对象
        this.callbacks = {};
        this.fieldEntities = [];
    }
    registerField = (fieldEntity:TypeField) => {
        this.fieldEntities.push(fieldEntity)
    }
    _notifyAllEntities = () => {
        this.fieldEntities.forEach((entiry:TypeField) => entiry.onStroeChange())
    }
    setFieldsValue = (newStore:{}) => {
        this.store = {...this.store,...newStore}// 把 newStore里面的属性都赋值给this.store
        this._notifyAllEntities()
    }
    setFieldValue = (name:string,value:any) => {
        this.store[name] = value;
        this._notifyAllEntities()
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
    setInitialValues = (initialValues:{}, mounted:boolean) => {
        if(!mounted){
            this.store = {...initialValues}
        }
    }
    submit = () => {
        this.validateFields()
        .then((values:any) => {
            let { onFinish } = this.callbacks;
            if(onFinish){
                onFinish(values)
            }
        })
        .catch((error:any) =>{
            let { onFinishFailed } = this.callbacks;
            if(onFinishFailed){
                onFinishFailed(error)
            } 
        })
    }
    // 校验表单的值
    validateFields = () => {
        let values = this.getFieldsValue();// store
        let descriptor = this.fieldEntities.reduce((
            des:{
                [_:string]:{}   
            },
            entity:TypeField,
        )=>{
            let rules = entity.props.rules;// [{required:true},{min:3}]
            if (rules && rules.length>0) {
                let config = rules.reduce((memo:Rules,rule:Rules)=>{
                    memo = {...memo, ...rule};
                    return memo
                },{});// {required:ture,min:3}
                des[entity.props.name] = config;
            }
            return des
        },{})
        return new Schema(descriptor).validate(values);
    }
    getForm = () => {
        return {
            setFieldValue:this.setFieldValue,
            setFieldsValue:this.setFieldsValue,
            getFieldValue:this.getFieldValue,
            getFieldsValue:this.getFieldsValue,
            setCallbacks:this.setCallbacks,
            submit:this.submit,
            setInitialValues:this.setInitialValues,
            registerField:this.registerField,
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
