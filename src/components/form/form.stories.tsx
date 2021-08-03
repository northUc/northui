import { ComponentMeta, ComponentStory } from '@storybook/react';
import Form from './form';
import Field from './field';
import {
	withKnobs,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
type ComponentType = ComponentStory<typeof Form>

export const knobsForm:ComponentType = (args) => (
    <Form
        initialValues={{username:'',password:''}}
        onFinish={values => {
            console.log('Finish:', values);
        }}
    >
        <Field name="username">
            <input placeholder="Username" />
        </Field>
        <Field name="password">
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
