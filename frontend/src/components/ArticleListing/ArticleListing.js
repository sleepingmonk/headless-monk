import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArticlePost from './ArticlePost/ArticlePost';

const StyledArticleListing = styled.ul`
  list-style: none;
`;


class ArticleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    this.constructPosts = this.constructPosts.bind(this);
    this.getIncludes = this.getIncludes.bind(this);
  }

  constructPosts(posts, includes) {

    let constructedPosts = [];
    posts.map((post, index) => {
      const postData = post;
      const postImages = this.getIncludes(post.relationships.field_image);
      const postTags = this.getIncludes(post.relationships.field_tags);
      const currentPost = {
        data: postData,
        images: postImages,
        tags: postTags
      }
      constructedPosts.push(currentPost)
      return constructedPosts;
    });
    this.setState({
      posts: constructedPosts
    })
  }

  getIncludes(field) {
    if(field.data === null) {
      return null;
    }
    const allIncludes = this.props.includes;
    const filteredResults = allIncludes.filter((include) => {
      let _include;
      if(Array.isArray(field.data)) {
        for(let i = 0; i < field.data.length; i++) {
          if(include.id === field.data[i].id) {
            _include = include;
          }
        }
      }
      if(include.id === field.data.id) {
        _include = include;
      }
      return _include;
    }
    );
    return filteredResults;
  }

  componentDidMount() {
    this.constructPosts(this.props.articlePosts, this.props.includes);
  }

  render() {
    let articleList;
    if(this.state.posts.length > 0) {
      articleList = this.state.posts.map(post => {
        return(
          <ArticlePost
            key={post.data.attributes.nid}
            title={post.data.attributes.title}
            summary={post.data.attributes.body.summary}
            link={post.data.attributes.path.alias}
            showPost={() => this.props.showPost({
              postData: post.data,
              postImages: post.images,
              postTags: post.tags
            })}
            images={post.images}
            tags={post.tags}
          />
        );
      })
    }
    return (
      <StyledArticleListing>
        {articleList}
      </StyledArticleListing>
    );
  }

}

ArticleListing.propTypes = {
  articlePosts: PropTypes.array.isRequired,
  includes: PropTypes.array,
  showPost: PropTypes.func.isRequired,
};

export default ArticleListing;
