import React, {
	createContext,
	useMemo,useState,
	useEffect,
	useRef,
	useContext,
} from "react";
// import styled from "styled-components";
// import { color, typography } from "../shared/styles";
// import { darken, rgba, opacify } from "polished";
// import { easing } from "../shared/animation";



type KeepAliveProps = {
	id: string;
}

const Context = createContext({});
export function AliveScope(props:any) {
	const [state, setState] = useState({});
	const ref:any = useMemo(() => {
		return {};
	}, []);
	const keep = useMemo(() => {
		return (id:any, children:any) =>
			new Promise((resolve) => {
				setState({
					[id]: { id, children },
				});
				setTimeout(() => {
					//需要等待setState渲染完拿到实例返回给子组件。
					resolve(ref[id]);
				});
			});
	}, [ref]);
	return (
		<Context.Provider value={keep}>
			{props.children}
			{Object.values(state).map(({ id, children }:any) => (
				<div
					key={id}
					ref={(node) => {
						ref[id] = node;
					}}
				>
					{children}
				</div>
			))}
		</Context.Provider>
	);
}

export function KeepAlive(props:any) {
	const keep:any = useContext(Context);
	useEffect(() => {
		const init = async ({ id, children }:any) => {
			const realContent = await keep(id, children);
			if (ref.current) {
				ref.current.appendChild(realContent);
			}
		};
		init(props);
	}, [props, keep]);
	const ref:any = useRef(null);
	return <div ref={ref} />;
}
