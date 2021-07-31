import { ComponentMeta, ComponentStory } from '@storybook/react';
import {CSSProperties} from "styled-components";
import React from "react";
import { Progress } from "./index";
import { Icon } from "../icon";
import {
	withKnobs,
	text,
	boolean,
	color,
	number,
	object
} from "@storybook/addon-knobs";
type ComponentType = ComponentStory<typeof Progress>

export const knobsProgress:ComponentType = (args) => (
	<Progress
		{...args}
	></Progress>
);
knobsProgress.args = {
	count:number("count", 50, { range: true, min: 0, max: 100, step: 1 }),
	countNumber:boolean("countNumber", true),
	height:number("height", 8),
	circle:boolean("circle", false),
	size:number("size", 100),
	primary:color("primary", "#FF4785"),
	secondary:color("secondary", "#FFAE00"),
	bottomColor:color("bottomColor", "#DDDDDD"),
	flashColor:color("flashColor", "#FFFFFF"),
	progressText:text("progressText", ""),
	classname:text("classname",""),
	style:object<CSSProperties>("style",{}),
}
export const test:ComponentType = (args) => <Progress count={20} circle={true}></Progress>;

export const circle :ComponentType = (args) =>  <Progress count={80} circle={true}></Progress>;

export const progressText:ComponentType = (args) =>  (
	<Progress count={11} progressText={"yehuozhili"}></Progress>
);

export const changeColor:ComponentType = (args) => (
	<Progress
		count={20}
		primary="blue"
		secondary="yellow"
		bottomColor="brown"
	></Progress>
);

export const withIcon :ComponentType = (args) => (
	<Progress
		count={11}
		progressText={
			<span>
				<Icon icon="admin"></Icon>
			</span>
		}
	></Progress>
);

export default {
	title: "Progress",
	component: Progress,
	decorators: [withKnobs],
} as ComponentMeta<typeof Progress>;
