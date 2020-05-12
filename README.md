This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts
In the project directory, you can run:
### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.



**第一步触发action 操作**

**第二步进行分发操作  分发操作成功后，将dispatch和数据递交到store 中，store得到action**

**第三步：store得到的action 传给postReducer,reducer得到状态，会进行判断到底执行的是哪一个类型**

**第四步：将最新的状态给posts组件**

**第五步：获得reducers返回的最新状态**




![Image text](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)


### Provider组件的出现是作为中间件降低各组件与Store之间的耦合。

首先，对原组件进行了封装： render方法中, 渲染了其子级元素, 使整个应用成为`Provider`的子组件。
```
import { Provider} from 'react-redux';
  <Provider store={store}>
            用Redux容器将状态保存起来
  </Provider>
```

 ### Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

### Redux 提供`createStore`这个函数，用来生成 Store。

```
import { createStore } from 'redux';
const store = createStore(fn);
```

`createStore`函数接受另一个函数作为参数，返回新生成的 Store 对象。

```
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/index';
const initialStore = {};
const middleware = [thunk];


export const store = createStore(
    rootReducers,
    initialStore,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
   
)

```
Reducer 在异步操作结束后自动执行 ->用到中间件middleware 
    createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
    中间件的次序有讲究。
        const store = createStore(
            reducer,
            applyMiddleware(thunk, promise, logger)
        );
    applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，logger就一定要放在最后，否则输出结果会不正确。
    applyMiddlewares()
            ：它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
            中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法。

### 中间件
```
import { applyMiddleware, createStore } from 'redux';
```
```
const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```
### redux-thunk 中间件
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```


### .Action 是一个对象。其中的`type`属性是必须的，表示 Action 的名称
```
 dispatch({
      type: FETCH_POSTS,
      payload:posts
})
```
Action 的名称是` FETCH_POSTS`，它携带的信息是字符串`posts` 


### .Action Creator*
**定义一个函数来生成 Action，这个函数就叫 Action Creator。**
异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，
没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？
奥妙就在 `Action Creator `之中。

异步组件：
        加载成功后（componentDidMount方法），
        它送出了（dispatch方法）一个 Action，向服务器要求数据
        这里的fetchPosts就是 Action Creator。
        
 fetchPosts是一个Action Creator（动作生成器）
 

 ```
 export const FETCH_POSTS = "FETCH_POSTS";
 ```
```
export const FETCH_POSTS = "FETCH_POSTS";

//分发操作  分发操作成功后，将dispatch和数据递交到store 中，store得到action，
export function fetchPosts() {
    return function (dispatch) {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(posts =>
                dispatch({
                    type: FETCH_POSTS,
                    payload:posts
                })

            )
    }
}

```


### Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名


```
import {combineReducers} from 'redux';
import postReducer from './postReducer';
export default combineReducers({
    posts1:postReducer  
})
```


```

import {
    FETCH_POSTS
} from '../actions/types';

const inittialState = {
    items: [],
   
}
export default function (state = inittialState, action) {
    console.log("reducers")
    switch (action.type) {

        case FETCH_POSTS:
            return {
                ...state, //由actions中的postActions type返回新数据
                items: action.payload //将得到最新的状态给
            }
                default:
                    return state;
    }
}
```

Posts组件接受reducers的最近状态
```
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

  //第一步触发action 操
    componentDidMount() {
        this.props.fetchPosts();
    }
//定义类型
Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts:PropTypes.array.isRequired
}


//第五步：获得reducers返回的最新状态
const mapStateToProps = state => ({
    posts: state.posts1.items,
    newPost:state.posts1.item
})
export default connect(mapStateToProps, { fetchPosts })(Posts) ;
```
