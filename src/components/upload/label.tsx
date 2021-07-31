import axios, {
	AxiosRequestConfig,
	CancelTokenSource
  } from "axios";
import { iconSpin } from "../shared/animation";
import styled, { css } from "styled-components";
import { color } from "../shared/styles";
import React from "react";
export const btnStyle = {
	padding: "10px",
  };
export const rotateBtnStyle = {
    padding: "10px",
    transform: "rotateY(180deg)",
};

export const ImgWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 104px;
    height: 104px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    > img {
        width: 100%;
        height: 100%;
    }

    &::before {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        content: " ";
    }
    &:hover::before {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        content: " ";
    }
    &:hover > .closebtn {
        display: block;
    }
`;

export const ImgCloseBtn = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: none;
`;

export const ProgressListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const ProgressLi = styled.li`
    list-style: none;
    padding: 10px;
    box-shadow: 2px 2px 4px #d9d9d9;
`;

export const ImgUpload = styled.div`
    display: inline-block;
    position: relative;
    width: 104px;
    height: 104px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    > svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const IconSpin = styled.span`
    &>svg{
        ${css`
        animation: ${iconSpin} 2s linear infinite;
        `}
    }
`;

export const ProgressListItemName = styled.div<{ status: ProgressBarStatus }>`
    color: ${(props) => chooseProgressListColor(props.status)};
`;



export type ProgressBarStatus = "ready" | "success" | "failed" | "upload";

export function chooseProgressListColor(status: ProgressBarStatus) {
    switch (status) {
        case "failed":
        return color.negative;
        case "ready":
        return color.warning;
        case "success":
        return color.positive;
        case "upload":
        return color.secondary;
}
}

export const updateFilist = (
    setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
    _file: ProgressBar,
    uploadPartial: Partial<ProgressBar>
) => {
    setFlist((prevList) => {
        if (prevList) {
        return prevList.map((v) => {
            if (v.uid === _file.uid) {
            return { ...v, ...uploadPartial };
            } else {
            return v;
            }
        });
        } else {
        return prevList;
        }
    });
};

export interface ProgressBar {
    filename: string;
    percent: number;
    status: "ready" | "success" | "failed" | "upload";
    uid: string;
    size: number;
    raw: File | null;
    cancel?: CancelTokenSource;
    img?: string | ArrayBuffer | null;
}

export type onProgressType = ((p: number, f: File, i: number) => void) | undefined;

export const postData = function (
    file: File,
    filename: string,
    config: Partial<AxiosRequestConfig>,
    i: number, //多重上传时i用来标识第几个
    onProgress: onProgressType,
    setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
    successCallback: ((res: any, i: number) => void) | undefined,
    failCallback: ((res: any, i: number) => void) | undefined
) {
	console.log('===>files',file, file.name, file.size);
    const formData = new FormData();
    formData.append(filename, file);
    const source = axios.CancelToken.source();
    const _file: ProgressBar = {
        filename: file.name,
        percent: 0,
        status: "ready",
        uid: Date.now() + "upload",
        size: file.size,
        raw: file,
        cancel: source,
    };
    setFlist((prev) => {
        //添加进队列
        return [_file, ...prev];
    });

    const defaultAxiosConfig: Partial<AxiosRequestConfig> = {
        method: "post",
        url: "http://localhost:51110/user/uploadAvatar/",
        data: formData,
        headers: {
        "Content-Type": "multipart/form-data",
        },
        cancelToken: source.token,
        onUploadProgress: (e:any) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        updateFilist(setFlist, _file, {
            status: "upload",
            percent: percentage,
        }); //更新上传队列
        if (onProgress) {
            onProgress(percentage, file, i);
        }
    },
};
const mergeConfig = { ...defaultAxiosConfig, ...config };

return axios(mergeConfig)
    .then((res) => {
    updateFilist(setFlist, _file, { status: "success", percent: 100 });
    if (successCallback) {
        successCallback(res, i);
    }
    })
    .catch((r) => {
    updateFilist(setFlist, _file, { status: "failed", percent: 0 });
    if (failCallback) {
        failCallback(r, i);
    }
    });
};

export const resolveFilename = function (
    uploadFilename: string[] | string,
    index: number
) {
if (Array.isArray(uploadFilename)) {
    return uploadFilename[index];
} else {
    return uploadFilename;
}
};


export const getBase64 = (raw: File, callback: Function) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        callback(reader.result)
    });
    reader.readAsDataURL(raw);
}