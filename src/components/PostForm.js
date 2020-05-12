import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
// 向接口中追加数据
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            body:''
         }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body,          
        };
        console.log(this.state.title)
        console.log(this.state.body)

        //触发action
        this.props.createPost(post)
  
    }
    render() { 
        return ( 
            <div>
                <h1>添加内容</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label >title</label>
                    <input type="text" name="title" onChange={this.onChange.bind(this)} value={this.state.title}></input>
                     <label>body</label>
                    <input type="text" name="body" onChange={this.onChange.bind(this)} value={this.state.body}></input>
                    <button type ="submit">添加</button>
                </form>
            </div>
         );
    }
}
PostForm.propTypes = {
    createPost: PropTypes.func.isRequired,
    posts:PropTypes.array.isRequired
}
export default connect(null,{createPost})(PostForm);