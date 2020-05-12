import {combineReducers} from 'redux';
import postReducer from './postReducer';
export default combineReducers({
    posts1:postReducer  
})
//第四步：将最新的状态给posts组件


//Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
//你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
//这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名