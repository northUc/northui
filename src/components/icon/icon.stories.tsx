import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import { Icon, IconProps } from "./index";
import { withKnobs, color, select } from "@storybook/addon-knobs";
import styled from "styled-components";
import { icons } from "../shared/icons";

const Meta = styled.div`
	color: #666;
	font-size: 12px;
`;
const List = styled.ul`
	display: flex;
	flex-flow: row wrap;
	list-style: none;
`;
const Item = styled.li`
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	flex: 0 1 20%;
	min-width: 120px;
	padding: 0px 7.5px 20px;
	svg {
		margin-right: 10px;
		width: 24px;
		height: 24px;
	}
`;

type ComponentType = ComponentStory<typeof Icon>

export const knobsIcon:ComponentType = (args) => (
	<Icon
		{...args}
	></Icon>
);
knobsIcon.args = {
	icon:select<IconProps["icon"]>(
		"icons",
		Object.keys(icons) as IconProps["icon"][],
		"bookmark"
	),
	color:color("color", "black")
}

export const labels:ComponentType = (args) => (
	<>
		There are {Object.keys(icons).length} icons
		<List>
			{Object.keys(icons).map((key) => (
				<Item key={key}>
					<Icon icon={key as keyof typeof icons}  />
					<Meta>{key}</Meta>
				</Item>
			))}
		</List>
	</>
);

export default {
	title: "Icon",
	component: Icon,
	decorators: [withKnobs],
} as ComponentMeta<typeof Icon>; 