import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
   //第一步触发action 操作
    componentDidMount() {
        this.props.fetchPosts();
        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    render() { 
        //因为已经获取到最新的state 所以将state 转化为props
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
          </div>
      ))
        return ( 
            <div>
                <h1>Posts</h1>
                {postItems}         
            </div>
         );
    }
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