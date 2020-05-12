import React from 'react';
import './App.css';
import Posts from './components/Posts';
import PostForm from './components/PostForm';
import { Provider} from 'react-redux';
import {store} from './store';


// 用redux 容器将状态保存起来

function App() {
  return (
    <div className="App">
      <Provider store={store}>
            <PostForm/>
             <Posts />
      </Provider>
    </div>  
  );
}

export default App;
