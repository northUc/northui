import React from 'react';
import { TreeData } from '../typings';
import file from '../assets/file.png';
import closedFolder from '../assets/closed-folder.png';
import openedFolder from '../assets/opened-folder.png';
import loadingSrc from '../assets/loading.gif';
import './index.css';
interface Collapse {
    (key: string): void;
}
interface Props {//接口类型，可以用来装饰或者 说约束 组件属性对象
    data: TreeData[];
    onCollapse: Collapse;
    onCheck: Collapse;
    setFromNode: any;
    onMove: any
}
class TreeNode extends React.Component<Props> {
    treeNodeRef: React.RefObject<HTMLDivElement>;
    constructor(props:Props){
        super(props);
        this.state={}
        this.treeNodeRef = React.createRef();
    }
    componentDidMount() {
        if(this.treeNodeRef.current){
            this.treeNodeRef.current.addEventListener('dragstart', (event: DragEvent): void => {
                this.props.setFromNode(this.props.data);
                event.stopPropagation();
            }, false);//useCapture=false
            this.treeNodeRef.current.addEventListener('dragenter', (event: DragEvent) => {
                event.preventDefault();
                event.stopPropagation();
            }, false);
            this.treeNodeRef.current.addEventListener('dragover', (event: DragEvent) => {
                event.preventDefault();
                event.stopPropagation();
            }, false);
            this.treeNodeRef.current.addEventListener('drop', (event: DragEvent) => {
                event.preventDefault();
                this.props.onMove(this.props.data);
                event.stopPropagation();
            }, false);
        }
    }
    caretFn = (treeDom:TreeData) => {
        let {  onCollapse } = this.props;
        const { children, key, collapsed, loading } = treeDom
        let caret = null;//打开关闭的小箭头
        let icon = null;//图标
        if (children) {//如果children有值
            if (children.length > 0) {
                caret = (
                    <span className={`collapse ${collapsed ? 'caret-right' : 'caret-down'}`}
                        onClick={() => onCollapse(key)}
                    ></span>
                )
                icon = collapsed ? closedFolder : openedFolder;
            } else {
                caret = null;
                icon = file;
            }
        } else {//没有children属性
            caret = (
                loading ? <img src={loadingSrc} className="collapse" style={{ width: 14, top: '50%', marginTop: -7 }} /> : <span className={`collapse caret-right`}
                    onClick={() => onCollapse(key)}
                ></span>
            )
            icon = closedFolder;//关闭的文件夹
        }
        return {
            icon,
            caret
        }
    }
    render() {
        let { data, onCheck } = this.props;
        return (
            <div className="tree-node">
                {
                    (data && data.length > 0 ) && (
                        <div className="children">
                            {
                                data.map((item: TreeData, _index:number)=> {
                                    const {icon,caret} = this.caretFn(data[_index])
                                    console.log('===>', item.name, item.collapsed);
                                    return (
                                        <div key={_index}>
                                            <div className="inner">
                                                {caret}
                                                <span className="content">
                                                    <input type="checkbox" checked={item.checked} onChange={() => onCheck(item.key)} />
                                                    <img style={{ width: 20 }} src={icon} />
                                                    {item.name}
                                                </span>
                                            </div>
                                        <TreeNode
                                            onCollapse={this.props.onCollapse}
                                            data={!item.collapsed&&item.children ? item.children : []}
                                            onCheck={onCheck}
                                            setFromNode={this.props.setFromNode}
                                            onMove={this.props.onMove}
                                            key={item.key} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}
export default TreeNode;