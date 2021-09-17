import React from 'react';
import  FieldContext from './fieldContext';
import useFrom from './useFrom';
type OnFinish = (value:string)=>void;
type onFinishFailed = (value:string)=>void;
type Props = {
    initialValues:{},
    onFinish?:OnFinish,
    onFinishFailed?:onFinishFailed,
    children?:JSX.Element | React.ReactNode,
}

const Form:React.FC<Props> = ({initialValues,onFinish,onFinishFailed,children}) => {
    let [fromInstance] = useFrom();
    fromInstance.setCallbacks({
        onFinish,
        onFinishFailed
    })
    // mountRef在多次渲染的时候 保持不变
    const mountRef = React.useRef(false);
    fromInstance.setInitialValues(initialValues, mountRef.current);
    if(!mountRef.current){
        mountRef.current = true;
    }
    return (
        <form
            onSubmit={
                event=>{
                    event.preventDefault();
                    event.stopPropagation();
                    // 要调用表单提交的方法
                    fromInstance.submit();
                }
            }
        >
            <FieldContext.Provider value={fromInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}
export default Form;