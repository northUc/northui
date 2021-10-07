import React,{useState} from "react";
import { KeepAliveProvider,withKeepAlive } from "./index";
import {
	withKnobs,
} from "@storybook/addon-knobs";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import { Dispatch } from './cache-types'
type RProps = {
    dispatch: Dispatch,
}

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			count: {count}
			<button onClick={() => setCount((count) => count + 1)}>add</button>
		</div>
	);
}
type ComponentType = ComponentStory<typeof KeepAliveProvider>

const KeepAliveCounter = withKeepAlive(Counter,{});
// ComponentAlive
export const ComponentAlive:ComponentType = function (args) {
	const [show, setShow] = useState(true);
	return (
		<KeepAliveProvider>
			<div>
				<button onClick={() => setShow((show) => !show)}>Toggle</button>
				<p>无 KeepAlive</p>
				{show && <Counter />}
				<p>有 KeepAlive</p>
				{show && (
					<KeepAliveCounter />
				)}
			</div>
		</KeepAliveProvider>
	);
}

// RouteAlive
class Home extends React.Component<RProps>{
    render(){
        return (
            <div>
                <button onClick={()=>this.props.dispatch({
                    type:'DESTROY',payload:{cacheId:"UserAdd"}
                })}>重置UserAdd</button>
                <button  onClick={()=>this.props.dispatch({
                    type:'DESTROY',payload:{cacheId:"UserList"}
                })}>重置UserList</button>
            </div>
        )
    }
}

const UserAdd = props=>{
    let [number,setNumber] = useState(0);
    return (
        <div>
            用户名:<input/>
            <button onClick={()=>setNumber(number=>number+1)}>{number}</button>
        </div>
    )
}

const UserList = props=>{
    let users = new Array(100).fill(0);
    return (
        <ul style={{height:'200px',overflow:'scroll'}}>
            {
                users.map((user,index)=>(
                    <li key={index}>
                       {index}
                    </li>
                ))
            }
        </ul>
    )
}


const KeepAliveHome = withKeepAlive(Home,{});
const KeepAliveUserList = withKeepAlive(UserList,{cacheId:'UserList',scroll:true});
const KeepAliveUserAdd = withKeepAlive(UserAdd,{cacheId:'UserAdd'});

export const RouteAlive:ComponentType = function (args) {
	return (
		<BrowserRouter>
			<KeepAliveProvider>
				<ul>
					<li><Link to="/">首页</Link></li>
					<li><Link to="/list">用户列表</Link></li>
					<li><Link to="/add">添加用户</Link></li>
				</ul>
				<Switch>
					<Route path="/" component={KeepAliveHome} exact/>
					<Route path="/list" component={KeepAliveUserList}/>
					<Route path="/add" component={KeepAliveUserAdd}/>
				</Switch>
			</KeepAliveProvider>
	    </BrowserRouter>
	);
}

export default {
	title: "KeepAlive",
	component: KeepAliveProvider,
	decorators: [withKnobs],
	parameters:{
		docs:{
			source:{
				code: `
const KeepAliveHome = withKeepAlive(Home,{});
const KeepAliveUserList = withKeepAlive(UserList,{cacheId:'UserList',scroll:true});
const KeepAliveUserAdd = withKeepAlive(UserAdd,{cacheId:'UserAdd'});

export const RouteAlive:ComponentType = function (args) {
	return (
		<BrowserRouter>
			<KeepAliveProvider>
				<ul>
					<li><Link to="/">首页</Link></li>
					<li><Link to="/list">用户列表</Link></li>
					<li><Link to="/add">添加用户</Link></li>
				</ul>
				<Switch>
					<Route path="/" component={KeepAliveHome} exact/>
					<Route path="/list" component={KeepAliveUserList}/>
					<Route path="/add" component={KeepAliveUserAdd}/>
				</Switch>
			</KeepAliveProvider>
		</BrowserRouter>
	);
}
				`,
				type: 'code'
			}
		}
	}
} as ComponentMeta<typeof KeepAliveProvider>;
