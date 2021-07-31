import { HTMLAttributes } from "react";
export declare const AvatarSize: {
    large: number;
    medium: number;
    small: number;
    tiny: number;
};
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    /** 是否加载中*/
    isLoading?: boolean;
    /** 用户名*/
    username?: string;
    /** 图片地址 */
    src?: null | string;
    /** 头像大小 */
    size?: keyof typeof AvatarSize;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
export declare namespace Avatar {
    var defaultProps: {
        isLoading: boolean;
        username: string;
        src: null;
        size: string;
    };
}
