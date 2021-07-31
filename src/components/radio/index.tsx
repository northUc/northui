import {RadioWrapper, Label, Input, OptionalText, Error, Description, RadioProps} from './label';
import React from 'react';


export function Radio(props: RadioProps) {
	const {
		wrapperClass,
		error,
		description,
		label,
		hideLabel,
		style,
		...restProps
	} = props;
	const { disabled } = props;

	return (
		<RadioWrapper className={wrapperClass} style={style}>
			<Label disabled={disabled}>
				<Input
					{...restProps}
					role="radio"
                    // ?
					// aria-invalid={!!error}
					type="radio"
				/>
				<span>
					<OptionalText hideLabel={hideLabel}>{label}</OptionalText>
				</span>
			</Label>
			{error && <Error>{error}</Error>}
			{description && <Description>{description}</Description>}
		</RadioWrapper>
	);
}

Radio.defaultProps = {
	appearance: "primary",
	hideLabel: false,
};

export default Radio;