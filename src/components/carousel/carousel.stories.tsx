import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import { Carousel } from "./index";
import {
	withKnobs,
	text,
	boolean,
	color,number,
	select,
} from "@storybook/addon-knobs";

type ComponentType = ComponentStory<typeof Carousel>

const height = number("height", 300);
const num = number("item number", 4);
export const knobsCarousel:ComponentType = (args) => {
	return (
		<Carousel
			{...args}
		>
			{new Array(num).fill(height).map((v, i) => DivExample(v, i))}
		</Carousel>
	);
}
knobsCarousel.args = {
	delay:number("delay", 300),
	height:height,
	radioAppear:select(
		"radioAppear",
		Object.keys(color) as Array<keyof typeof color>,
		"primary"
	),
	defaultIndex:number("defaultIndex", 0),
	autoplay:boolean("autoplay", true),
	viewportBoxshadow:text("viewportBoxshadow", "2px 2px 4px #d9d9d9"),
	autoplayReverse:boolean("autoplayReverse", false),
	animationDelay:number("animationDelay", 500),
	autoplayDelay:number("autoplayDelay", 5000),
}
const DivExample = function (height: number, index: number) {
	return (
		<div
			style={{
				background: "#364d"+index+index,
			}}
			key={index}
		>
			<span
				style={{
					lineHeight: `${height}px`,
					color: "white",
					fontSize: "20px",
					fontWeight: 800,
					width: "100%",
					textAlign: "center",
					display: "inline-block",
				}}
			>
				{index + 1}
			</span>
		</div>
	);
};

export default {
	title: "Carousel",
	component: Carousel,
	decorators: [withKnobs],
	// parameters: {
	// 	docs: {
	// 	  source: {
	// 		code: 'dynamic',
	// 		type: 'code',
	// 	  }
	// 	}
	//   }
} as ComponentMeta<typeof Carousel>;
