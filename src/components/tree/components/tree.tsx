import React from 'react';
import { TreeData } from '../typings';
import TreeNode from './tree-node';
import styled from "styled-components";

const Stree = styled.div`
    /* position: fixed;
    top:0;
    left:0;
    bottom:0; */
    width:70%;
    overflow-x: hidden;
    overflow-y:auto;
    background-color: #EEE;
    .tree-nodes{
        position: relative;
        overflow: hidden;
    }
    .tree-node{ 
        } 
    .inner{
        color:#000;
        font-size:20px;
        position: relative;
        cursor: pointer;
        padding-left: 10px;
        
    }
    .children{
        padding-left:20px;
    }
    .collapse{
        position: absolute;
        left:0;
        cursor: pointer;
    }
    .caret-right::before{
        content:'+';
    }
    .caret-down:before{
        content:'-';
    }
    .content{
        display:inline-block;
        width:100%;
        padding:4px 5px;
    }
`

interface Props {//接口类型，可以用来装饰或者 说约束 组件属性对象
    data: TreeData[]
}
//Props是用来限制this.props State 是用来限定this.state
interface State {//组件的状态
    data: TreeData[],
    fromNode?: TreeData;
}
interface KeyNodeMap {
    //属性名任意，值是一个TreeData类型
    [key: string]: TreeData
}
class Tree extends React.Component<Props, State> {
    keyNodeMap: KeyNodeMap = {};
    constructor(props: Props) {
        super(props);
        this.state = { data: this.props.data };//把属性传递给状态
        this.buildKeyMap();//创建一个keyMap key
    }
    buildKeyMap = (): void => {
        let data = this.state.data;
        this.keyNodeMap = {};//key节点的key 值 就是节点本身
        data.forEach(item => {
            this.keyNodeMap[item.key] = item;//data是根节点
            if (item.children && item.children.length > 0) {
                this.walk(item.children, item);
            }
        })
    }
    walk = (children: TreeData[], parent: TreeData): void => {
        children.forEach((item: TreeData) => {
            item.parent = parent;//在节点上增加一个parent属性，指定自己的父亲
            this.keyNodeMap[item.key] = item;
            if (item.children && item.children.length > 0) {
                this.walk(item.children, item);
            }
        });
    }
    onCollapse = (key: string) => {
        let data = this.keyNodeMap[key];
        if (data) {
            let { children } = data;
            if (children) {
                data.collapsed = !data.collapsed;
                data.children = data.children || [];//后面会改成懒加载
                this.setState({ data: this.state.data });
            } else {//如果没有children属性，则说明儿子未加载，需要加载
                data.loading = true;
                this.setState({ data: this.state.data });
                setTimeout(() => {
                    data.children = [
                        {
                            name: data.name + '的儿子1',
                            key: `${data.key}-1`,
                            type: 'folder',
                            collapsed: true
                        },
                        {
                            name: data.name + '的儿子2',
                            key: `${data.key}-2`,
                            type: 'folder',
                            collapsed: true
                        }
                    ]
                    data.loading = false;
                    data.collapsed = false;
                    this.buildKeyMap();
                    this.setState({ data: this.state.data });
                }, 200);
            }

        }
    }
    onCheck = (key: string) => {
        let data = this.keyNodeMap[key];
        if (data) {
            data.checked = !data.checked;//先把自己取反
            if (data.checked) {//如果新的状态为true的话
                this.checkChildren(data.children, true);
                this.checkParent(data.parent!);//如果一个节点，它所有的子节点都被选中了。自己也要被选 中
            } else {
                this.checkChildren(data.children, false);//让所有的下级节点取消选 中
                this.checkParent(data.parent!);
            }
            this.setState({ data: this.state.data });
        }

    }
    checkParent = (parent: TreeData) => {
        if(parent) {
            parent.checked = parent.children!.every((item: TreeData) => item.checked);
            if(parent.parent){
                this.checkParent(parent.parent)
            }
        }
    }
    checkChildren = (children: TreeData[] = [], checked: boolean) => {
        children.forEach((item: TreeData) => {
            item.checked = checked;
            this.checkChildren(item.children, checked);
        });
    }
    setFromNode = (fromNode: TreeData) => {
        this.setState({ ...this.state, fromNode });
    }
    onMove = (toNode: TreeData) => {
        let fromNode = this.state.fromNode;
        if(!fromNode) return;
        let fromChildren = fromNode!.parent!.children, toChildren = toNode.parent.children;
        let fromIndex = fromChildren!.findIndex((item: TreeData) => item === fromNode);
        let toIndex = toChildren!.findIndex(item => item === toNode);
        fromChildren!.splice(fromIndex, 1, toNode);
        toChildren!.splice(toIndex, 1, fromNode);
        this.buildKeyMap();
    }
    render() {
        return (
            <Stree>
                <div className="tree-nodes">
                    <TreeNode
                        onCollapse={this.onCollapse}
                        onCheck={this.onCheck}
                        data={this.props.data}
                        setFromNode={this.setFromNode}
                        onMove={this.onMove}
                    />
                </div>
            </Stree>
        )
    }
}

export default Tree;