import React, { Component, Fragment } from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import axios from "axios";
import ArticleListing from './components/ArticleListing/ArticleListing';
import SingleArticlePost from './components/SingleArticlePost/SingleArticlePost';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      articlePosts: [],
      showList: true,
      currentPost: {},
      isError: false,
      statusMessage: '',
    }
    this.showPost = this.showPost.bind(this);
    this.returnToList = this.returnToList.bind(this);
  }

  showPost(post) {
    this.setState({
      showList: false,
      currentPost: post,
    });
  }

  returnToList(e) {
    this.setState({
      showList: true,
      currentPost: {},
    })
  }

  componentDidMount() {
    axios.get(`http://backend.headless.lndo.site/jsonapi/node/article?include=field_tags,field_image`)
      .then(res => {
        const articlePosts = res.data;
        this.setState({articlePosts: articlePosts});
      })
      .catch((error) => {
        this.setState({
          isError: true,
          statusMessage: error.message,
        })
        console.log(error);
      });
  }

  render(){
    return(
      <div>
        {this.state.isError &&
          <StatusMessage message={this.state.statusMessage} type={'Error'} />
        }
        {(this.state.showList === true && this.state.articlePosts.data) &&
          <Fragment>
            <h2>Article Listing</h2>
            <ArticleListing
              articlePosts={this.state.articlePosts.data}
              includes={this.state.articlePosts.included}
              showPost={this.showPost}
            />
          </Fragment>
        }
        {(this.state.showList !== true && this.state.articlePosts.data) &&
          <SingleArticlePost
            postDetails={this.state.currentPost}
            returnToList={this.returnToList}
          />
        }
      </div>
    );
  }
}

export default hot(module)(App);
