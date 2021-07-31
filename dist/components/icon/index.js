var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import { icons } from "../shared/icons";
var Svg = styled.svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: ", ";\n\tvertical-align: middle;\n\n\tshape-rendering: inherit;\n\ttransform: translate3d(0, 0, 0);\n"], ["\n\tdisplay: ", ";\n\tvertical-align: middle;\n\n\tshape-rendering: inherit;\n\ttransform: translate3d(0, 0, 0);\n"])), function (props) { return (props.block ? "block" : "inline-block"); });
var Path = styled.path(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tfill: ", ";\n"], ["\n\tfill: ", ";\n"])), function (props) { return props.color; });
export function Icon(props) {
    var block = props.block, icon = props.icon, color = props.color;
    return (_jsx(Svg, __assign({ viewBox: "0 0 1024 1024", width: "20px", height: "20px", block: block }, props, { children: _jsx(Path, { d: icons[icon], color: color }, void 0) }), void 0));
}
Icon.defaultProps = {
    block: false,
    color: "black",
};
var templateObject_1, templateObject_2;
