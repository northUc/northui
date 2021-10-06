import { ComponentMeta, ComponentStory } from '@storybook/react';
import Form from './form';
import Field from './field';
import {
	withKnobs,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Validate } from './async-validator';
const uniqueUserName = (rule:Validate,value: string | []) => {
    console.log('==>>', rule);
    return new Promise((resolve,rejevt)=>{
        setTimeout(()=>{
            if(value === 'zhufeng'){
                resolve('用户名已被占用')
            } else {
                resolve('')
            }
        },3000)
    })
}
type ComponentType = ComponentStory<typeof Form>

export const knobsForm:ComponentType = (args) => (
    <Form
        initialValues={{username:'11',password:'22'}}
        onFinish={values => {
            console.log('Finish:', values);
        }}
        onFinishFailed = {
            (errorInfo) => {
                console.log('error', errorInfo)
            }
        }
    >
        <Field name="username" rules={[{required: true,min:3}]}>
            <input placeholder="Username" />
        </Field>
        <Field name="password" rules={[{required: true},{validate :uniqueUserName}]}>
            <input placeholder="Password" />
        </Field>
        <button>Submit</button>
    </Form>
)
knobsForm.args={
	onFinish:action("callback"),
	// delay:number("delay", 200),
	// initDate:text("initDate", ""),
}

export default {
	title: "Form",
	component: Form,
	decorators: [withKnobs],
} as ComponentMeta<typeof Form>;
