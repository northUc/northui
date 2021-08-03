import React from 'react';
import  FieldContext from './fieldContext';
import useFrom from './useFrom';
type OnFinish = (value:string)=>void;
type Props = {
    initialValues:{},
    onFinish?:OnFinish,
    children?:JSX.Element | React.ReactNode,
}

const Form:React.FC<Props> = ({initialValues,onFinish,children}) => {
    let [fromInstance] = useFrom();
    fromInstance.setCallbacks({
        onFinish,
    })
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