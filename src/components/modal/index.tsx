import React, {
	ReactNode,
	PropsWithChildren,
	useMemo,useState,useRef,useEffect,
} from "react";
import {CSSProperties} from "styled-components";
import {createPortal} from "react-dom";
import   Button  from "../button";
import { Icon } from "../icon";
import { ModalWrapper, ModalViewPort, ModalMask, CloseBtn, ConfirmWrapper, ChildrenWrapper, TitleWrapper} from './label'
 
export function useStateAnimation(
	parentSetState: (v: boolean) => void,
	delay: number = 300
): [boolean, (v: boolean) => void, () => void] {
	const [state, setState] = useState(true);
	const [innerClose, unmount] = useMemo(() => {
		let timer: number;
		let innerclose = (v: boolean) => {
			setState(v);
			timer = window.setTimeout(() => {
				parentSetState(v);
				setState(true);
			}, delay);
		};
		let unmount = () => window.clearTimeout(timer);
		return [innerclose, unmount];
	}, [setState, parentSetState, delay]);
	return [state, innerClose, unmount];
}
export function useStopScroll(state: boolean, delay: number, open?: boolean) {
	if (open) {
		let width = window.innerWidth - document.body.clientWidth;
		if (state) {
			document.body.style.overflow = "hidden";
			document.body.style.width = `calc(100% - ${width}px)`;
		} else {
			//等动画渲染
			setTimeout(() => {
				document.body.style.overflow = "auto";
				document.body.style.width = `100%`;
			}, delay);
		}
	}
}



export type ModalProps = {
	/** 父组件用来控制的状态 */
	visible: boolean;
	/** 容器位置 */
	container?: Element;
	/** 父组件setstate */
	parentSetState: (v: boolean) => void;
	/** 弹出框标题 */
	title?: ReactNode;
	/** 是否有确认按钮 */
	confirm?: boolean;
	/** 改变确认按钮文本*/
	okText?: string;
	/** 改变取消按钮文本*/
	cancelText?: string;
	/** 点了确认的回调，如果传了，需要自行处理关闭 */
	onOk?: (set:(v: boolean) => void) => void;
	/** 点了取消的回调，如果传了，需要自行处理关闭*/
	onCancel?: (set:(v: boolean) => void) => void;
	/** 点确认或者取消都会走的回调 */
	callback?: (v: boolean) => void;
	/** 点击mask是否关闭模态框 */
	maskClose?: boolean;
	/** 是否有mask */
	mask?: boolean;
	/** 自定义模态框位置 */
	style?: CSSProperties;
	/** 是否有右上角关闭按钮 */
	closeButton?: boolean;
	/** 动画时间 */
	delay?: number;
	/** 是否停止滚动*/
	stopScroll?: boolean;
	/** portralstyle*/
	portralStyle?: CSSProperties;
	/** portral的回调 */
	refCallback?: (ref: HTMLDivElement) => void;
	/** 没点确认于取消，直接关闭的回调 */
	closeCallback?: () => void;
	child?: ReactNode,
};

export function Modal(props: PropsWithChildren<ModalProps>) {
	const {
		visible,
		maskClose,
		closeButton,
		delay,
		mask,
		container,
		confirm,
		okText,
		style,
		cancelText,
		onOk,
		onCancel,
		callback,
		title,
		parentSetState,
		stopScroll,
		portralStyle,
		refCallback,
		closeCallback,
	} = props;

	const ref = useRef<HTMLDivElement>(null);

	const [state, setState, unmount] = useStateAnimation(parentSetState, delay);

	const render = useMemo(() => {
		if (!visible) {
			unmount();
			return null;
		} else {
			return createPortal(
				<ModalWrapper ref={ref} style={portralStyle}>
					<ModalViewPort style={style} visible={state} delay={delay!}>
						<div>
							{title && <TitleWrapper>{title}</TitleWrapper>}
							{closeButton && (
								<CloseBtn>
									<Button
										style={{
											background: "white",
											borderRadius: "5px",
											padding: "5px",
										}}
										onClick={() => {
											setState(false);
											if (closeCallback) closeCallback();
										}}
									>
										<Icon icon="closeAlt"></Icon>
									</Button>
								</CloseBtn>
							)}
						</div>
						{<ChildrenWrapper>{props.children}</ChildrenWrapper>}
						{confirm && (
							<ConfirmWrapper>
								<Button
									appearance="secondary"
									onClick={() => {
										onOk ? onOk(setState) : setState(false);
										if (callback) callback(true);
									}}
								>
									{okText ? okText : "确认"}
								</Button>
								<Button
									appearance="secondary"
									onClick={() => {
										onCancel ? onCancel(setState) : setState(false);
										if (callback) callback(false);
									}}
									style={{ marginLeft: "10px" }}
								>
									{cancelText ? cancelText : "取消"}
								</Button>
							</ConfirmWrapper>
						)}
					</ModalViewPort>
					{mask && (
						<ModalMask
							onClick={() => {
								if (maskClose) {
									setState(false);
									if (closeCallback) {
										closeCallback();
									}
								}
							}}
						></ModalMask>
					)}
				</ModalWrapper>,
				container!
			);
		}
	}, [
		callback,
		cancelText,
		closeButton,
		closeCallback,
		confirm,
		container,
		mask,
		maskClose,
		okText,
		onCancel,
		onOk,
		portralStyle,
		props.children,
		setState,
		style,
		title,
		state,
		visible,
		delay,
		unmount,
	]);
	useStopScroll(visible!, 300, stopScroll!);
	useEffect(() => {
		if (refCallback && ref.current) {
			refCallback(ref.current);
		}
	}, [refCallback]);
	
	return <>{render}</>;
}

Modal.defaultProps = {
	container: document.body,
};