import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import { DatePicker } from "./index";
import {
	withKnobs,
	text,
	number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

type ComponentType = ComponentStory<typeof DatePicker>

export const knobsDatePicker:ComponentType = (args) => (
	<div style={{ height: "500px" }}>
		<DatePicker
		{...args}
		></DatePicker>
	</div>
);
knobsDatePicker.args={
	callback:action("callback"),
	delay:number("delay", 200),
	initDate:text("initDate", ""),
}

export default {
	title: "DatePicker",
	component: DatePicker,
	decorators: [withKnobs],
} as ComponentMeta<typeof DatePicker>;
