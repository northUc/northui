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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RadioWrapper, Label, Input, OptionalText, Error, Description } from './label';
export function Radio(props) {
    var wrapperClass = props.wrapperClass, error = props.error, description = props.description, label = props.label, hideLabel = props.hideLabel, style = props.style, restProps = __rest(props, ["wrapperClass", "error", "description", "label", "hideLabel", "style"]);
    var disabled = props.disabled;
    return (_jsxs(RadioWrapper, __assign({ className: wrapperClass, style: style }, { children: [_jsxs(Label, __assign({ disabled: disabled }, { children: [_jsx(Input, __assign({}, restProps, { role: "radio", 
                        // ?
                        // aria-invalid={!!error}
                        type: "radio" }), void 0), _jsx("span", { children: _jsx(OptionalText, __assign({ hideLabel: hideLabel }, { children: label }), void 0) }, void 0)] }), void 0), error && _jsx(Error, { children: error }, void 0), description && _jsx(Description, { children: description }, void 0)] }), void 0));
}
Radio.defaultProps = {
    appearance: "primary",
    hideLabel: false,
};
export default Radio;
