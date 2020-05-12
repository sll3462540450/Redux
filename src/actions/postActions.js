//connect
import {
    FETCH_POSTS,
    NEW_POST
} from './types';

/*
异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，
没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？
奥妙就在 Action Creator 之中。
    异步组件：
        加载成功后（componentDidMount方法），
        它送出了（dispatch方法）一个 Action，向服务器要求数据
        这里的fetchPosts就是 Action Creator。

fetchPosts是一个Action Creator（动作生成器）
*/
//分发操作
// export function fetchPosts() {
//     return function (dispatch) {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//             .then(res => res.json())
//             .then(posts =>
//                 dispatch({
//                     type: FETCH_POSTS,
//                     payload:posts
//                 })

//             )
//     }
// }


//第二部进行分发操作  代码优化es6格式
//分发操作成功后，将dispatch和数据递交到store 中，store得到action，
//第三步：store得到的action 传给postReducer,reducer得到状态，会进行判断到底执行的是哪一个类型
export const fetchPosts = () => dispatch => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(posts =>
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        )
}

export const createPost = postData => dispatch => {
    console.log("createPost");
    
    fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post =>
            dispatch({
                type: NEW_POST,
                payload: post
            })
        )
}