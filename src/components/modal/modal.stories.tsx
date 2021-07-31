import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, {
	useState,
}from "react";
import {
	withKnobs,
	text,
	boolean,
	number
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Modal } from "./index";
import Button from "../button";
type ComponentType = ComponentStory<typeof Modal>


// function KnobsModal() 

export const knobsModal:ComponentType = (args)=>
	{
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [state, setState] = useState(false);
		return (
			<div>
				<Modal
					refCallback={args.refCallback}
					stopScroll={args.stopScroll}
					delay={args.delay}
					closeButton={args.closeButton}
					mask={args.mask}
					maskClose={args.maskClose}
					callback={args.callback}
					cancelText={args.cancelText}
					okText={args.okText}
					confirm={args.confirm}
					title={args.title}
					parentSetState={setState}
					visible={state}
				>
					{args.child}
				</Modal>
				<Button onClick={() => setState(!state)}>toggle</Button>
			</div>
		);
	}
knobsModal.args = {
	refCallback:action("refcallback"),
	stopScroll:boolean("stopScroll", true),
	delay:number("delay", 200),
	closeButton:boolean("closeButton", true),
	mask:boolean("mask", true),
	maskClose:boolean("maskClose", true),
	callback:action("callback"),
	cancelText:text("cancelText", ""),
	okText:text("okText", ""),
	confirm:boolean("confirm", true),
	title:text("title", "标题"),
	child:text("children", "sdsdsssda"),
}

export default {
	title: "Modal",
	component: Modal,
	decorators: [withKnobs],
} as ComponentMeta<typeof Modal>;
