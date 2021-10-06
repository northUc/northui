import React,{useState} from "react";
import { KeepAliveProvider,withKeepAlive } from "./index";
import {
	withKnobs,
} from "@storybook/addon-knobs";
import { ComponentMeta, ComponentStory } from '@storybook/react';

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			count: {count}
			<button onClick={() => setCount((count) => count + 1)}>add</button>
		</div>
	);
}
type ComponentType = ComponentStory<typeof KeepAliveProvider>



const KeepAliveHome = withKeepAlive<typeof Counter>(Counter,{});

export const App:ComponentType = function (args) {
	const [show, setShow] = useState(true);
	return (
		<KeepAliveProvider>
			<div>
				<button onClick={() => setShow((show) => !show)}>Toggle</button>
				<p>无 KeepAlive</p>
				{show && <Counter />}
				<p>有 KeepAlive</p>
				{show && (
					<KeepAliveHome />
				)}
			</div>
		</KeepAliveProvider>
	);
}


export default {
	title: "KeepAlive",
	component: KeepAliveProvider,
	decorators: [withKnobs],
} as ComponentMeta<typeof KeepAliveProvider>;
