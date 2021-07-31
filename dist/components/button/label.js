var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from '../shared/animation';
export var APPEARANCES = {
    primary: "primary",
    primaryOutline: "primaryOutline",
    secondary: "secondary",
    secondaryOutline: "secondaryOutline",
    tertiary: "tertiary",
    outline: "outline",
    inversePrimary: "inversePrimary",
    inverseSecondary: "inverseSecondary",
    inverseOutline: "inverseOutline",
};
export var SIZES = {
    small: "small",
    medium: "medium",
};
// ****
export var Text = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: inline-block;\n\tvertical-align: top;\n"], ["\n\tdisplay: inline-block;\n\tvertical-align: top;\n"])));
export var Loading = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\tright: 0;\n\topacity: 0;\n"], ["\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 0;\n\tright: 0;\n\topacity: 0;\n"])));
export var btnPadding = {
    medium: "13px 20px",
    small: "8px 16px",
};
export var StyledButton = styled.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0,0,0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n\n\n  font-size: ", "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ", "\n\n  ", " {\n    transform: scale3d(1,1,1) translate3d(0,0,0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n  \n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", ";\n\n    ", ";\n\n    ", ";\n\n      ", "\n\n      ", "\n\n      ", ";\n\n    ", "\n"], ["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0,0,0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n\n\n  font-size: ", "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ", "\n\n  ", " {\n    transform: scale3d(1,1,1) translate3d(0,0,0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n  \n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", ";\n\n    ", ";\n\n    ", ";\n\n      ", "\n\n      ", "\n\n      ", ";\n\n    ", "\n"])), function (props) {
    return props.size === SIZES.small ? "8px 16px" : "13px 20px";
}, function (props) {
    return props.size === SIZES.small ? typography.size.s1 : typography.size.s2;
}, typography.weight.extrabold, function (props) {
    return !props.isLoading &&
        "\n      &:hover {\n        transform: translate3d(0, -2px, 0);\n        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n      }\n\n      &:active {\n        transform: translate3d(0, 0, 0);\n      }\n\n      &:focus {\n        box-shadow: " + rgba(color.primary, 0.4) + " 0 1px 9px 2px;\n      }\n\n      &:focus:hover {\n        box-shadow: " + rgba(color.primary, 0.2) + " 0 8px 18px 0px;\n      }\n    ";
}, Text, easing.rubber, Loading, function (props) {
    return props.disabled &&
        "\n      cursor: not-allowed !important;\n      opacity: 0.5;\n      &:hover {\n        transform: none;\n      }\n    ";
}, function (props) {
    return props.isUnclickable &&
        "\n      cursor: default !important;\n      pointer-events: none;\n      &:hover {\n        transform: none;\n      }\n    ";
}, function (props) {
    return props.isLoading &&
        "\n      cursor: progress !important;\n      opacity: 0.7;\n\n      " + Loading + " {\n        transition: transform 700ms " + easing.rubber + ";\n        transform: translate3d(0, -50%, 0);\n        opacity: 1;\n      }\n\n      " + Text + " {\n        transform: scale3d(0, 0, 1) translate3d(0, -100%, 0);\n        opacity: 0;\n      }\n\n      &:hover {\n        transform: none;\n      }\n    ";
}, function (props) {
    return props.appearance === APPEARANCES.primary &&
        "\n      background: " + color.primary + ";\n      color: " + color.lightest + ";\n\n      " + (!props.isLoading &&
            "\n          &:hover {\n            background: " + darken(0.05, color.primary) + ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: " + rgba(color.primary, 0.4) + " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: " + rgba(color.primary, 0.2) + " 0 8px 18px 0px;\n          }\n        ") + "\n    ";
}, function (props) {
    return props.appearance === APPEARANCES.secondary &&
        "\n      background: " + color.secondary + ";\n      color: " + color.lightest + ";\n\n      " + (!props.isLoading &&
            "\n          &:hover {\n            background: " + darken(0.05, color.secondary) + ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: " + rgba(color.secondary, 0.4) + " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: " + rgba(color.secondary, 0.2) + " 0 8px 18px 0px;\n          }\n        ") + "\n    ";
}, function (props) {
    return props.appearance === APPEARANCES.tertiary &&
        "\n      background: " + color.tertiary + ";\n      color: " + color.darkest + ";\n\n      " + (!props.isLoading &&
            "\n          &:hover {\n            background: " + darken(0.05, color.tertiary) + ";\n          }\n          &:active {\n            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n          }\n          &:focus {\n            box-shadow: " + rgba(color.darkest, 0.15) + " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: " + rgba(color.darkest, 0.05) + " 0 8px 18px 0px;\n          }\n        ") + "\n    ";
}, function (props) {
    return props.appearance === APPEARANCES.outline &&
        "\n      box-shadow: " + opacify(0.05, color.border) + " 0 0 0 1px inset;\n      color: " + color.dark + ";\n      background: transparent;\n\n      " + (!props.isLoading &&
            "\n          &:hover {\n            box-shadow: " + opacify(0.3, color.border) + " 0 0 0 1px inset;\n          }\n\n          &:active {\n            background: " + opacify(0.05, color.border) + ";\n            box-shadow: transparent 0 0 0 1px inset;\n            color: " + color.darkest + ";\n          }\n\n          &:active:focus:hover {\n            " + 
            /* This prevents the semi-transparent border from appearing atop the background */ "" + "\n            background: " + opacify(0.05, color.border) + ";\n            box-shadow:  " + rgba(color.darkest, 0.15) + " 0 1px 9px 2px;\n          }\n\n          &:focus {\n            box-shadow: " + opacify(0.05, color.border) + " 0 0 0 1px inset, \n            " + rgba(color.darkest, 0.15) + " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: " + opacify(0.05, color.border) + " 0 0 0 1px inset, \n            " + rgba(color.darkest, 0.05) + " 0 8px 18px 0px;\n          }\n        ") + ";\n    ";
}, function (props) {
    return props.appearance === APPEARANCES.primaryOutline &&
        "\n        box-shadow: " + color.primary + " 0 0 0 1px inset;\n        color: " + color.primary + ";\n\n        &:hover {\n          box-shadow: " + color.primary + " 0 0 0 1px inset;\n          background: transparent;\n        }\n\n        &:active {\n          background: " + color.primary + ";\n          box-shadow: " + color.primary + " 0 0 0 1px inset;\n          color: " + color.lightest + ";\n        }\n        &:focus {\n          box-shadow: " + color.primary + " 0 0 0 1px inset, " + rgba(color.primary, 0.4) + " 0 1px 9px 2px;\n        }\n        &:focus:hover {\n          box-shadow: " + color.primary + " 0 0 0 1px inset, " + rgba(color.primary, 0.2) + " 0 8px 18px 0px;\n        }\n      ";
}, function (props) {
    return props.appearance === APPEARANCES.secondaryOutline &&
        "\n        box-shadow: " + color.secondary + " 0 0 0 1px inset;\n        color: " + color.secondary + ";\n\n        &:hover {\n          box-shadow: " + color.secondary + " 0 0 0 1px inset;\n          background: transparent;\n        }\n\n        &:active {\n          background: " + color.secondary + ";\n          box-shadow: " + color.secondary + " 0 0 0 1px inset;\n          color: " + color.lightest + ";\n        }\n        &:focus {\n          box-shadow: " + color.secondary + " 0 0 0 1px inset,\n            " + rgba(color.secondary, 0.4) + " 0 1px 9px 2px;\n        }\n        &:focus:hover {\n          box-shadow: " + color.secondary + " 0 0 0 1px inset,\n            " + rgba(color.secondary, 0.2) + " 0 8px 18px 0px;\n        }\n      ";
}, function (props) {
    return props.appearance === APPEARANCES.inversePrimary &&
        "\n          background: " + color.lightest + ";\n          color: " + color.primary + ";\n\n          " + (!props.isLoading &&
            "\n              &:hover {\n                background: " + color.lightest + ";\n              }\n              &:active {\n                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n              }\n              &:focus {\n                box-shadow: " + rgba(color.primary, 0.4) + " 0 1px 9px 2px;\n              }\n              &:focus:hover {\n                box-shadow: " + rgba(color.primary, 0.2) + " 0 8px 18px 0px;\n              }\n          ") + "\n      ";
}, function (props) {
    return props.appearance === APPEARANCES.inverseSecondary &&
        "\n          background: " + color.lightest + ";\n          color: " + color.secondary + ";\n\n          " + (!props.isLoading &&
            "\n              &:hover {\n                background: " + color.lightest + ";\n              }\n              &:active {\n                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;\n              }\n              &:focus {\n                box-shadow: " + rgba(color.secondary, 0.4) + " 0 1px 9px 2px;\n              }\n              &:focus:hover {\n                box-shadow: " + rgba(color.secondary, 0.2) + " 0 8px 18px 0px;\n              }\n          ") + "\n      ";
}, function (props) {
    return props.appearance === APPEARANCES.inverseOutline &&
        "\n          box-shadow: " + color.lightest + " 0 0 0 1px inset;\n          color: " + color.lightest + ";\n\n          &:hover {\n            box-shadow: " + color.lightest + " 0 0 0 1px inset;\n            background: transparent;\n          }\n\n          &:active {\n            background: " + color.lightest + ";\n            box-shadow: " + color.lightest + " 0 0 0 1px inset;\n            color: " + color.darkest + ";\n          }\n          &:focus {\n            box-shadow: " + color.lightest + " 0 0 0 1px inset,\n              " + rgba(color.darkest, 0.4) + " 0 1px 9px 2px;\n          }\n          &:focus:hover {\n            box-shadow: " + color.lightest + " 0 0 0 1px inset,\n              " + rgba(color.darkest, 0.2) + " 0 8px 18px 0px;\n          }\n      ";
}, function (props) {
    return props.backgroundColor &&
        "\n      background: " + props.backgroundColor + ";\n    ";
});
var templateObject_1, templateObject_2, templateObject_3;
