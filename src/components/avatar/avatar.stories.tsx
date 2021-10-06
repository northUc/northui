import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import { Avatar, AvatarSize } from "./index";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

type AvatarSizeType = keyof typeof AvatarSize;

type ComponentType = ComponentStory<typeof Avatar>


export const knobsAvatar:ComponentType = (args) => (
	<Avatar
        {...args}
	/>
);
knobsAvatar.args = {
    size:select<AvatarSizeType>(
        "size",
        Object.keys(AvatarSize) as AvatarSizeType[],
        "medium"
    ),
    username:text("username", "yehuozhili"),
    src:text(
        "src",
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    ),
    isLoading:boolean("isLoading", false),
}

export const large = (args) => (
	<div>
		<Avatar isLoading size="large" />
		<Avatar size="large" username="yehuozhili" />
		<Avatar
			size="large"
			username="yehuozhili"
			src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
		/>
	</div>
);

export const medium = () => (
	<div>
		<Avatar isLoading />
		<Avatar username="中文" />
		<Avatar
			username="yehuozhili"
			src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
		/>
	</div>
);

export const small = () => (
	<div>
		<Avatar isLoading size="small" />
		<Avatar size="small" username="yehuozhili" />
		<Avatar
			size="small"
			username="yehuozhili"
			src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
		/>
	</div>
);

export const tiny = (args) => (
	<div>
		<Avatar isLoading size="tiny" />
		<Avatar size="tiny" username="yehuozhili" />
		<Avatar
			size="tiny"
			username="yehuozhili"
			src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
		/>
	</div>
);

export default {
	title: "Avatar",
	component: Avatar,
	decorators: [withKnobs],
} as ComponentMeta<typeof Avatar>;