import React from "react";
import { Pagination } from "./index";
import { withKnobs,number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	title: "Pagination",
	component: Pagination,
	decorators: [withKnobs],
} as ComponentMeta<typeof Pagination>;

type ComponentType = ComponentStory<typeof Pagination>

export const knobsPagination:ComponentType = (args) => (
	<Pagination
		{...args}
	></Pagination>
);
knobsPagination.args={
	defaultCurrent:number("defualtCurrent", 1),
	total:number("total", 100),
	barMaxSize:number("barMaxSize", 5),
	pageSize:number("pageSize", 5),
	callback:action("callback"),
}