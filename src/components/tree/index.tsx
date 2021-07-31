import React, {
	CSSProperties,
	useMemo,useState,useEffect,useRef
} from "react";
import { Icon } from "../icon";
import { source, TreeIcon, itemProps, itemPropsRequired, DragControlData, changeVisible, flatten, switchInsert, insertTop, insertMiddle, insertLower, TreeGrag, TreeItem} from './label';
const img = new Image();
img.src = "https://www.easyicon.net/api/resizeApi.php?id=1200841&size=32";

export function Tree(props: TreeProps) {
	const [dragUpdate, setDragUpdate] = useState(0);
	const [start, setStart] = useState(0);
	const forceUpdate = useState(0)[1];
	const ref = useRef<HTMLDivElement>(null);
	const root = useMemo(() => {
		return {
			level: 0,
			visible: true,
			expand: true,
			children: source,
			value: "root",
		};
	}, []);
	const [dragOver, setDragOver] = useState<DragControlData>({
		drag: false,
		x: 0,
		itemkey: "",
	});
	const [highlight, setHighlight] = useState({
		drag: true,
		itemkey: "",
	});
	const dragHandler = (
		clientX: number,
		itemkey: string,
		g: itemPropsRequired
	) => {
		const diff = clientX - start;
		const x = switchInsert(diff, g);
		setDragOver({
			drag: true,
			x,
			itemkey,
		});
	};
	const data = useMemo(() => {
		return flatten(root.children, 1, root);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [root, dragUpdate]);
	useEffect(() => {
		if (ref.current) {
			setStart(ref.current.getBoundingClientRect().left); //为了找到起始
		}
	}, []);
	useEffect(() => {
		const handler = () => {
			setDragOver((prev) => ({ ...prev, drag: false }));
		};

		window.addEventListener("dragend", handler);
		return () => {
			window.removeEventListener("dragend", handler);
		};
	}, []);
	useEffect(() => {
		const handler = () => {
			setDragOver((prev) => ({ ...prev, drag: false }));
			setHighlight({
				drag: false,
				itemkey: "",
			});
		};
		window.addEventListener("dragend", handler);
		return () => {
			window.removeEventListener("dragend", handler);
		};
	}, []);
	const callback = () => {
		forceUpdate((state) => state + 1);
	};
	const dragCallback = () => {
		setDragUpdate((state) => state + 1);
	};
	return (
		<div ref={ref}>
			{data
				.filter((v) => v.visible === true)
				.map((g) => {
					return (
						<TreeItem
							itemkey={g.key}
							highlight={highlight}
							level={g.level}
							draggable
							onClick={() => changeVisible(g, callback)}
							key={g.key}
							onDragStart={(e) => {
								e.dataTransfer.setData('endykey', `${g.key}`);
								e.dataTransfer.setDragImage(img, 29, 29);
								setHighlight({
								drag: true,
								itemkey: g.key,
								});
							}}
							onDragOver={(e) => {
								e.preventDefault();
								throttle(dragHandler)(e.clientX, g.key, g);
							}}
							onDrop={(e) => {
								const key = e.dataTransfer.getData('endykey');
								const left = e.clientX;
								const diff = left - start; //离顶部差值
								const res = switchInsert(diff, g);
								switch (res) {
								case 1:
									insertTop(key, g, data, dragCallback);
									break;
								case 2:
									insertMiddle(key, g, data, dragCallback);
									break;
								case 3:
									insertLower(key, g, data, dragCallback);
									break;
								default:
									break;
								}
							}}
						>
						{dragOver.drag && (
							<TreeGrag
							gkey={g.key}
							drag={dragOver.drag}
							x={dragOver.x}
							itemkey={dragOver.itemkey}
							></TreeGrag>
						)}
						<TreeIcon g={g}>
							<Icon icon="arrowdown"></Icon>
						</TreeIcon>
						<span>{g.value}</span>
						</TreeItem>
					);
				})
			}
		</div>
	);
}



export function throttle(fn: Function, delay: number = 300) {
	let flag = true;
	return function(...args: any) {
		if (flag) {
			flag = false;
			fn(...args);
			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
}


export type TreeProps = {
	/** 数据源*/
	source: itemProps[];
	/** 是否可以拖拽 */
	drag?: boolean;
	/** 高亮边框颜色 */
	borderColor?: string;
	/** 拖拽提示色 */
	backColor?: string;
	/**外层样式*/
	style?: CSSProperties;
	/**外层类名*/
	classname?: string;
};
Tree.defaultProps = {
	source: [],
	drag: true,
	borderColor: "#53c94fa8",
	backColor: "#00000030",
};
