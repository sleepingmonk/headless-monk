import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {hot} from "react-hot-loader";
import Button from '../Button/Button';

const SingleArticlePost = ({postDetails, returnToList}) => {
  function createMarkup() {
    return {__html: postDetails.postData.attributes.body.processed};
  }
  return(
    <div>
      {postDetails.postImages !== null &&
        postDetails.postImages.map((image) => {
          return(
            <img
              key={image.id}
              src={"http://backend.headless.lndo.site" + image.attributes.uri.url}
              alt="teaser image"
            />
          );
        })
      }
      <h2>{postDetails.postData.attributes.title}</h2>
      <div dangerouslySetInnerHTML={createMarkup()} />
      <Button click={() => returnToList()} text={'Back To List'} />
      {postDetails.postTags.length > 0 &&
        <Fragment>
          <h3>Tags</h3>
          <ul>
            {postDetails.postTags.map((tag) => {
              return(
                <li key={tag.id}>{tag.attributes.name}</li>
              );
            })}
          </ul>
        </Fragment>
      }
    </div>
  );
}

SingleArticlePost.propTypes = {
  postDetails: PropTypes.object.isRequired,
  returnToList: PropTypes.func.isRequired,
};

export default hot(module)(SingleArticlePost);
