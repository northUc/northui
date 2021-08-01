import { TreeData } from './typings';
const data: TreeData[] = [{
    name: '父亲',
    key: '1',
    type: 'folder',
    collapsed: false,
    children: [
        {
            name: '儿子1',
            key: '1-1',
            type: 'folder',
            collapsed: false,
            children: [
                {
                    name: '孙子1',
                    key: '1-11',
                    type: 'folder',
                    collapsed: false,
                    children: [
                        {
                            name: '重孙1',
                            key: '1-11-1',
                            type: 'file',
                            collapsed: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: '儿子2',
            key: '1-2',
            type: 'folder',
            collapsed: false
        }
    ]
}]
export default data;