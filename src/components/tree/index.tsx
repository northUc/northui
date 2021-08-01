import React from 'react';
import Tr from './components/tree';
import data from './data';//数据源

export function Tree(){
	return <Tr data={data} />
}