//reducer 的作业：返回新的状态
import {
    FETCH_POSTS,
    NEW_POST
} from '../actions/types';
// 第三步store得到的action 传给postReducer,reducer得到状态，和action
// 会进行判断到底执行的是哪一个type类型
const inittialState = {
    items: [],
    item: {}
}
export default function (state = inittialState, action) {
    console.log("reducers")
    switch (action.type) {

        case FETCH_POSTS:
            return {
                ...state, //由actions中的postActions type返回新数据
                items: action.payload //将得到最新的状态给
            }
            case NEW_POST:
                return {
                    ...state,
                    item: action.payload
                }
                default:
                    return state;
    }
}