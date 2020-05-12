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

/*
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
*/