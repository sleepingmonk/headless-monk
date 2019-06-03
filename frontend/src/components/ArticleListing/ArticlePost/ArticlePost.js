import React, {Fragment} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';


const StyledArticlePost = styled.li`
  text-align: left;
`;

const PostTitle = styled.h2`
  color: #999;
`;

const PostLink = styled.a`
  text-decoration: none;
  margin-right: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const TeaserImage = styled.img`
  max-width: 300px;
`;

const ArticlePost = ({title, summary, link, showPost, tags, images}) => {
  return(
    <StyledArticlePost>
      <PostTitle>{title}</PostTitle>
      {images !== null &&
        images.map((image) => {
          return(
            <TeaserImage
              key={image.id}
              src={"http://backend.headless.lndo.site" + image.attributes.url}
              alt="teaser image"
            />
          );
        })
      }
      <p>{summary}</p>
      <PostLink href={'http://backend.headless.lndo.site/' + link}>Read on CMS</PostLink>
      <Button click={() => showPost()} text={'Read Here'} />
      {tags.length > 0 &&
      <Fragment>
        <h3>Tags</h3>
        <ul>
          {tags.map((tag) => {
            return(
              <li key={tag.id}>{tag.attributes.name}</li>
            );
          })}
        </ul>
      </Fragment>
      }
    </StyledArticlePost>
  );
}

ArticlePost.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  link: PropTypes.string.isRequired,
  showPost: PropTypes.func.isRequired,
  tags: PropTypes.array,
  images: PropTypes.array
};

export default ArticlePost;
