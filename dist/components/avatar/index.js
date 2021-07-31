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
import { useMemo } from "react";
import styled, { css } from "styled-components";
import { color, typography } from "../shared/styles";
import { glow } from "../shared/animation";
import { Icon } from "../icon";
export var AvatarSize = {
    large: 40,
    medium: 28,
    small: 20,
    tiny: 16,
};
var Image = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 50%;\n  display: inline-block;\n  vertical-align: top;\n  overflow: hidden;\n  text-transform: uppercase;\n\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  img {\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  svg {\n    position: relative;\n    bottom: -2px;\n    height: 100%;\n    width: 100%;\n    vertical-align: top;\n  }\n\n  path {\n    fill: ", ";\n    animation: ", " 1.5s ease-in-out infinite;\n  }\n"], ["\n  background: ", ";\n  border-radius: 50%;\n  display: inline-block;\n  vertical-align: top;\n  overflow: hidden;\n  text-transform: uppercase;\n\n  height: ", "px;\n  width: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  img {\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  svg {\n    position: relative;\n    bottom: -2px;\n    height: 100%;\n    width: 100%;\n    vertical-align: top;\n  }\n\n  path {\n    fill: ", ";\n    animation: ", " 1.5s ease-in-out infinite;\n  }\n"])), function (props) { return (!props.isLoading ? "transparent" : color.light); }, AvatarSize.medium, AvatarSize.medium, AvatarSize.medium, function (props) {
    return props.size === "tiny" && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"], ["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"])), AvatarSize.tiny, AvatarSize.tiny, AvatarSize.tiny);
}, function (props) {
    return props.size === "small" && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"], ["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"])), AvatarSize.small, AvatarSize.small, AvatarSize.small);
}, function (props) {
    return props.size === "large" && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"], ["\n\t\t\theight: ", "px;\n\t\t\twidth: ", "px;\n\t\t\tline-height: ", "px;\n\t\t"])), AvatarSize.large, AvatarSize.large, AvatarSize.large);
}, function (props) {
    return !props.src && css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t\t\tbackground: ", ";\n\t\t"], ["\n\t\t\tbackground: ", ";\n\t\t"])), !props.isLoading && "#37D5D3");
}, color.medium, glow);
var Initial = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n\n  font-size: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n  text-align: center;\n\n  font-size: ", "px;\n  line-height: ", "px;\n\n  ", "\n\n  ", "\n\n  ", "\n"])), color.lightest, typography.size.s2, AvatarSize.medium, function (props) { return props.size === "tiny" && css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    font-size: ", "px;\n    line-height: ", "px;\n  "], ["\n    font-size: ", "px;\n    line-height: ", "px;\n  "])), parseFloat(typography.size.s1) - 2, AvatarSize.tiny); }, function (props) { return props.size === "small" && css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    font-size: ", "px;\n    line-height: ", "px;\n  "], ["\n    font-size: ", "px;\n    line-height: ", "px;\n  "])), typography.size.s1, AvatarSize.small); }, function (props) { return props.size === "large" && css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    font-size: ", "px;\n    line-height: ", "px;\n  "], ["\n    font-size: ", "px;\n    line-height: ", "px;\n  "])), typography.size.s3, AvatarSize.large); });
;
export function Avatar(props) {
    var isLoading = props.isLoading, src = props.src, username = props.username, size = props.size;
    var avatarFigure = useMemo(function () {
        var avatarFigure = _jsx(Icon, { icon: "useralt" }, void 0);
        var a11yProps = {};
        if (isLoading) {
            a11yProps["aria-busy"] = true;
            a11yProps["aria-label"] = "Loading avatar ...";
        }
        else if (src) {
            avatarFigure = (_jsx("img", { src: src, alt: username, "data-testid": "avatar-img" }, void 0));
        }
        else {
            a11yProps["aria-label"] = username;
            avatarFigure = (_jsx(Initial, __assign({ size: size, "aria-hidden": "true" }, { children: username.substring(0, 1) }), void 0));
        }
        return avatarFigure;
    }, [isLoading, src, username, size]);
    return (_jsx(Image, __assign({ size: size, isLoading: isLoading, src: src }, props, { "data-testid": "avatar-div" }, { children: avatarFigure }), void 0));
}
Avatar.defaultProps = {
    isLoading: false,
    username: "loading",
    src: null,
    size: "medium",
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
