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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { StyledButton, Text, Loading, APPEARANCES, SIZES } from './label';
export function Button(props) {
    var isLoading = props.isLoading, loadingText = props.loadingText, isLink = props.isLink, children = props.children;
    var buttonInner = (_jsxs(_Fragment, { children: [_jsx(Text, { children: children }, void 0), isLoading && _jsx(Loading, { children: loadingText || "Loading..." }, void 0)] }, void 0));
    var btnType = useMemo(function () {
        if (isLink) {
            return "a";
        }
    }, [isLink]);
    return (_jsx(StyledButton, __assign({ as: btnType }, props, { children: buttonInner }), void 0));
}
Button.defaultProps = {
    isLoading: false,
    loadingText: null,
    isLink: false,
    appearance: APPEARANCES.tertiary,
    isDisabled: false,
    isUnclickable: false,
    containsIcon: false,
    size: SIZES.medium,
    ButtonWrapper: undefined,
};
export default Button;
