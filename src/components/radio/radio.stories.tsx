import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from "react";
import { Radio } from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { color } from "../shared/styles";
import { Icon } from "../icon";

const onChange = action("change");

type ComponentType = ComponentStory<typeof Radio>;

export const knobsRadio:ComponentType = (args) => (
	<Radio
		{...args}
	></Radio>
);
knobsRadio.args = {
    appearance:select<keyof typeof color>(
        "color",
        Object.keys(color) as Array<keyof typeof color>,
        "primary"
    ),
    label:text("label", "i am radio"),
    onChange:onChange,
    hideLabel:boolean("hideLabel", false),
    error:text("error", ""),
    description:text("description", ""),
    disabled:boolean("disabled", false),
}

export const testColors :ComponentType = (args) => (
	<div>
		{Object.keys(color).map((v, i) => (
			<Radio
				key={i}
				name="group2"
				label={v}
				appearance={v as keyof typeof color}
			/>
		))}
	</div>
);


export const testOnchange :ComponentType = (args) => (
	<form>
		<Radio name="group1" label="apple" onChange={onChange} />
		<Radio name="group1" label="banana" onChange={onChange} />
		<Radio name="group1" label="pear" onChange={onChange} />
		<Radio name="group1" label="mongo" onChange={onChange} />
		<Radio name="group1" label="watermelon" onChange={onChange} />
	</form>
);

export const testDisabled :ComponentType = (args) => <Radio label="disabled" disabled></Radio>;

export const testExtraText :ComponentType = (args) => (
	<Radio
		label="the radio has extra text"
		error="error text"
		description="description text"
	></Radio>
);

export const testHideLabel :ComponentType = (args) => (
	<Radio
		label="the radio has extra text"
		description="label will hidden"
		hideLabel
	></Radio>
);

export const withIcon :ComponentType = (args) => (
	<Radio
		label={
			<span>
				<Icon icon="redux"></Icon>with icon
			</span>
		}
	></Radio>
);

const ParentControl = function (args) {
	const [state, setState] = useState(() => new Array(5).fill(false));
    const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		const target = e.target as HTMLInputElement;
		const index = (target.value as unknown) as number;
		let newArr = new Array(5).fill(false);
		newArr[index] = true;
		setState(newArr);
	};
	return (
		<div>
			<Radio
				label="apple"
				onClick={onClick}
				value={0}
				checked={state[0]}
				onChange={() => {}}
			/>
			<Radio
				label="banana"
				onClick={onClick}
				value={1}
				checked={state[1]}
				onChange={() => {}}
			/>
			<Radio
				label="pear"
				onClick={onClick}
				value={2}
				checked={state[2]}
				onChange={() => {}}
			/>
			<Radio
				label="mongo"
				onClick={onClick}
				value={3}
				checked={state[3]}
				onChange={() => {}}
			/>
			<Radio
				label="watermelon"
				onClick={onClick}
				value={4}
				checked={state[4]}
				onChange={() => {}}
			/>
		</div>
	);
}

export const testParentControl :ComponentType = (args) => <ParentControl args={args}></ParentControl>;


export default {
	title: "Radio",
	component: Radio,
	decorators: [withKnobs],
} as ComponentMeta<typeof Radio>;