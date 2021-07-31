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
import styled, { css } from "styled-components";
import { color, typography, background } from "../shared/styles";
export var badgeColor = {
    positive: color.positive,
    negative: color.negative,
    neutral: color.dark,
    warning: color.warning,
    error: color.lightest,
};
export var badgeBackground = {
    positive: background.positive,
    negative: background.negative,
    neutral: color.mediumlight,
    warning: background.warning,
    error: color.negative,
};
var BadgeWrapper = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tfont-size: 11px;\n\tline-height: 12px;\n\tpadding: 4px 12px;\n\tborder-radius: 3em;\n\tfont-weight: ", ";\n\n\tsvg {\n\t\theight: 12px;\n\t\twidth: 12px;\n\t\tmargin-right: 4px;\n\t\tmargin-top: -2px;\n\t}\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n"], ["\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tfont-size: 11px;\n\tline-height: 12px;\n\tpadding: 4px 12px;\n\tborder-radius: 3em;\n\tfont-weight: ", ";\n\n\tsvg {\n\t\theight: 12px;\n\t\twidth: 12px;\n\t\tmargin-right: 4px;\n\t\tmargin-top: -2px;\n\t}\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n"])), typography.weight.bold, function (props) {
    return props.status === "positive" && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"])), badgeColor.positive, badgeBackground.positive);
}, function (props) {
    return props.status === "negative" && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"])), badgeColor.negative, badgeBackground.negative);
}, function (props) {
    return props.status === "warning" && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"])), badgeColor.warning, badgeBackground.warning);
}, function (props) {
    return props.status === "error" && css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"])), badgeColor.error, badgeBackground.error);
}, function (props) {
    return props.status === "neutral" && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tcolor: ", ";\n\t\t\tbackground: ", ";\n\t\t"])), badgeColor.neutral, badgeBackground.neutral);
});
export function Badge(props) {
    return _jsx(BadgeWrapper, __assign({}, props), void 0);
}
Badge.defaultProps = {
    status: "neutral",
};
export default Badge;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
