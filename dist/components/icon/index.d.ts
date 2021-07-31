/// <reference types="react" />
import { icons } from "../shared/icons";
export interface IconProps {
    /** 图标名*/
    icon: keyof typeof icons;
    /** 是否块级元素 */
    block?: boolean;
    /** 颜色 */
    color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare namespace Icon {
    var defaultProps: {
        block: boolean;
        color: string;
    };
}
