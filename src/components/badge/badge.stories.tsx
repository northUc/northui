import React from "react";
import { Badge, BadgeProps, badgeColor } from "./index";
import { Icon } from "../icon/index";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { ComponentMeta, ComponentStory } from '@storybook/react';

type selectType = "positive" | "negative" | "neutral" | "warning" | "error";

type ComponentType = ComponentStory<typeof Badge>

export const knobsBadge:ComponentType = (args) => (
	<Badge
		{...args}
	>
		{text("children", "i am badge")}
	</Badge>
);
knobsBadge.args = {
    status:select<BadgeProps["status"]>(
        "status",
        Object.keys(badgeColor) as selectType[],
        "neutral"
    )
}

export const all:ComponentType = (args) => (
	<div>
		<Badge status="positive">Positive</Badge>
		<Badge status="negative">Negative</Badge>
		<Badge status="neutral">Neutral</Badge>
		<Badge status="error">Error</Badge>
		<Badge status="warning">Warning</Badge>
	</div>
);

export const withIcon:ComponentType = (args) => (
	<Badge status="warning">
		<Icon icon="check" />
		with icon
	</Badge>
);

export default {
	title: "Badge",
	component: Badge,
	decorators: [withKnobs],
} as ComponentMeta<typeof Badge>; 