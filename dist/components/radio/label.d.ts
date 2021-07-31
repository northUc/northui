import { ReactNode, AllHTMLAttributes } from "react";
import { color } from "../shared/styles";
export declare const Label: import("styled-components").StyledComponent<"label", any, RadioProps, never>;
export declare const OptionalText: import("styled-components").StyledComponent<"span", any, RadioProps, never>;
export declare const Description: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const RadioWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Input: import("styled-components").StyledComponent<"input", any, RadioProps, never>;
export declare const Error: import("styled-components").StyledComponent<"span", any, {}, never>;
export interface RadioProps extends Omit<AllHTMLAttributes<HTMLInputElement>, "as" | "label"> {
    /** 主题色 */
    appearance?: keyof typeof color;
    /** label展示 */
    label?: ReactNode;
    /** 是否隐藏label*/
    hideLabel?: boolean;
    /** 错误文本 */
    error?: string;
    /** 描述文本 */
    description?: string;
    /** wrapper类名 */
    wrapperClass?: string;
}
