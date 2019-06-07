import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {hot} from "react-hot-loader";

import Button from '../../Button/Button';

const ArticlePost = ({title, summary, link, showPost, tags, images}) => {
  return(
    <li>
      <h3>{title}</h3>
      {images !== null &&
        images.map((image) => {
          return(
            <img
              key={image.id}
              src={"http://backend.headless.lndo.site" + image.attributes.uri.url}
              alt="teaser image"
              style={{maxWidth: '300px'}}
            />
          );
        })
      }
      <p>{summary}</p>
      <a href={'http://backend.headless.lndo.site/' + link}>Read on CMS</a>
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
    </li>
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

export default hot(module)(ArticlePost);
