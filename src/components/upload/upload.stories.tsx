import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from "react";
import { Upload } from "./index";
import {
	withKnobs,
	text,
	boolean,
	select,
	number,
} from "@storybook/addon-knobs";
import { Method, AxiosRequestConfig } from "axios";
import { action } from "@storybook/addon-actions";

export default {
	title: "Upload",
	component: Upload,
	decorators: [withKnobs],
} as ComponentMeta<typeof Upload>;

const methods: Method[] = [
	"get",
	"GET",
	"delete",
	"DELETE",
	"head",
	"HEAD",
	"options",
	"OPTIONS",
	"post",
	"POST",
	"put",
	"PUT",
	"patch",
	"PATCH",
	"link",
	"LINK",
	"unlink",
	"UNLINK",
];

const axiosConfig: Partial<AxiosRequestConfig> = {
	url: text("url", "http://localhost:51111/user/uploadAvatar/"),
	method: select("method", methods, "post"),
};
type ComponentType = ComponentStory<typeof Upload>
export const knobsUpload:ComponentType = (args) => {
	return (
		<Upload
			{...args}
		></Upload>
	);
};
knobsUpload.args = {
	customBtn:text('customBtn',''),
	multiple:boolean("multiple", false),
	accept:text("accept", "*"),
	slice:boolean("slice", true),
	progress:boolean("progress", false),
	max:number("max", 100),
	onProgress:action("onProgress"),
	onRemoveCallback:action("onRemoveCallback"),
	uploadFilename:text("uploadFilename", "avatar"),
	axiosConfig:axiosConfig,
	uploadMode:select("uploadMode", ["default", "img"], "default"),
}

export const imgUpload:ComponentType = (args) => <Upload uploadMode="img"></Upload>;

export const progressUpload:ComponentType = (args) => <Upload progress={true}></Upload>;