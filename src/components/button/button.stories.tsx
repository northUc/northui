import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import {
	APPEARANCES,
	AppearancesTypes,
	SIZES,
	SizesTypes,
} from "./label";
import Button from './index';
import {
	withKnobs,
	text,
	boolean,
	select,
	color,
} from "@storybook/addon-knobs";

type ComponentType = ComponentStory<typeof Button>

export const knobsBtn:ComponentType = (args) => (
		<Button
			{...args}
		>
			{text("childrenText", "Hello Storyboo222k")}
		</Button>
);
knobsBtn.args = {
    backgroundColor: color('backgroundColor', ''),
	size:select<SizesTypes>("size", SIZES, SIZES.medium),
	href: text("hrefText", ""),
	isLink:boolean("isLink", false),
	loadingText:text("loadingTEXT", "I AM LOADING"),
	isLoading:boolean("isLoading", false),
	disabled:boolean("disabled", false),
	appearance:select<AppearancesTypes>(
		"APPEARANCES",
		APPEARANCES,
		APPEARANCES.primary
	),
	isUnclickable:boolean('isUnclickable', false),
}

export const buttons:ComponentType = (args) => (
	<>
		<Button appearance="primary">Primary</Button>
		<Button appearance="secondary">Secondary</Button>
		<Button appearance="tertiary">Tertiary</Button>
		<Button appearance="outline">Outline</Button>
		<Button appearance="primaryOutline">Outline primary</Button>
		<Button appearance="secondaryOutline">Outline secondary</Button>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inversePrimary">Primary inverse</Button>
		</div>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inverseSecondary">Secondary inverse</Button>
		</div>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inverseOutline">Outline inverse</Button>
		</div>
	</>
);

export const sizes:ComponentType = (args)=> (
	<>
		<Button appearance="primary">Default</Button>
		<Button appearance="primary" size="small">
			Small
		</Button>
	</>
);

export const loading:ComponentType = (args) => (
	<>
		<Button appearance="primary" isLoading>
			Primary
		</Button>
		<Button appearance="secondary" isLoading>
			Secondary
		</Button>
		<Button appearance="tertiary" isLoading>
			Tertiary
		</Button>
		<Button appearance="outline" isLoading>
			Outline
		</Button>
		<Button appearance="outline" isLoading loadingText="Custom...">
			Outline
		</Button>
	</>
);

export const disabled:ComponentType = (args) => (
	<>
		<Button appearance="primary" disabled>
			Primary
		</Button>
		<Button appearance="secondary" disabled>
			Secondary
		</Button>
		<Button appearance="tertiary" disabled>
			Tertiary
		</Button>
		<Button appearance="outline" disabled>
			Outline
		</Button>
	</>
);

export const link:ComponentType = (args) => (
	<>
		<Button appearance="primary" isLink href="/">
			Primary
		</Button>
		<Button appearance="secondary" isLink href="/">
			Secondary
		</Button>
		<Button appearance="tertiary" isLink href="/">
			Tertiary
		</Button>
		<Button appearance="outline" isLink href="/">
			Outline
		</Button>
	</>
);

export default {
	title: "Button",
	component: Button,
	decorators: [withKnobs],
} as ComponentMeta<typeof Button>;