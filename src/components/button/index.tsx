import {  PropsWithChildren, useMemo } from "react";
import { StyledButton, ButtonProps, Text, Loading, APPEARANCES, SIZES } from './label';


export function Button(props: PropsWithChildren<ButtonProps>) {
	const { isLoading, loadingText, isLink, children } = props;
	const buttonInner = (
		<>
			<Text>{children}</Text>
			{isLoading && <Loading>{loadingText || "Loading..."}</Loading>}
		</>
	);
	const btnType = useMemo(() => {
		if (isLink) {
			return "a";
		}
	}, [isLink]);

	return (
		<StyledButton as={btnType} {...props}>
			{buttonInner}
		</StyledButton>
	);
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