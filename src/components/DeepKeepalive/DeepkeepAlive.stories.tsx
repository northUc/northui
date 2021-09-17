import React,{useState} from "react";
import { KeepAliveProvider, withKeepAlive } from "./index";
import {
	withKnobs,
} from "@storybook/addon-knobs";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';


const Home = props=>{
    return (
        <div>
            <button onClick={()=>props.dispatch({
                type:'DESTROY',payload:{cacheId:"UserAdd"}
            })}>重置UserAdd</button>
            <button  onClick={()=>props.dispatch({
                type:'DESTROY',payload:{cacheId:"UserList"}
            })}>重置UserList</button>
        </div>
    )
}

const UserAdd = props =>{
    let [number,setNumber] = useState(0);
    return (
        <div>
            用户名:<input/>
            <button onClick={()=>setNumber(number=>number+1)}>{number}</button>
        </div>
    )
}

const UserList = props =>{
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

let KeepAliveHome = withKeepAlive(Home,{});
let KeepAliveUserList = withKeepAlive(UserList,{cacheId:'UserList',_scroll: false});
let KeepAliveUserAdd = withKeepAlive(UserAdd,{cacheId:'UserAdd'});
type ComponentType = ComponentStory<typeof KeepAliveProvider>
export const App:ComponentType = function (args) {
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
App.args={}

export default {
	title: "KeepAliveProvider",
	component: KeepAliveProvider,
	decorators: [withKnobs],
} as ComponentMeta<typeof KeepAliveProvider>;
