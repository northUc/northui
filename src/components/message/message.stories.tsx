import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Message, MessageType, message } from "./index";
import {
	withKnobs,
	text,
	color,number,
	select,
	object,
} from "@storybook/addon-knobs";
import Button from "../button";
import { Icon } from "../icon";

export default {
	title: "Message",
	component: Message,
	decorators: [withKnobs],
} as ComponentMeta<typeof Message>;
  
  const Options: MessageType[] = [
	"info",
	"success",
	"error",
	"warning",
	"loading",
	"default",
  ];
type ComponentType = ComponentStory<typeof Message>
  
  export const knobsMessage:ComponentType = (args) => {
	const onClick = () => message[args.iconType](args.content, {
		delay: args.fconfig.delay,
		animationDuring: args.fconfig.animationDuring,
		background: args.fconfig.background,
		color: args.fconfig.color,
		callback: args.fconfig.callback,
	});
  
	return (
	  <div>
		<Button onClick={onClick}>click</Button>
	  </div>
	);
  };
  knobsMessage.args = {
	iconType:select<MessageType>("iconType", Options, "default"),
	content:text("content", "hello message"),
	fconfig:{
		delay: number("delay", 2000),
		animationDuring: number("animationDuring", 300),
		background: color("background", "#fff"),
		color: color("color", "#333"),
		callback: object('callback',()=>{console.log(123)}),
	}
  }
  export const callbackTest = () => (
	<div>
	  <Button
		onClick={() =>
		  message.loading("加载中", {
			callback: () => message.success("加载完成"),
		  })
		}
	  >
		callback
	  </Button>
	</div>
  );
  
  export const withIcon = () => (
	<div>
	  <Button
		onClick={() =>
		  message.default(
			<span>
			  <Icon icon="admin"></Icon>111
			</span>
		  )
		}
	  >
		callback
	  </Button>
	</div>
  );