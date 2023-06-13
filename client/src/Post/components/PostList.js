import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";

// Import Components
import PostListItem from './PostListItem';

function PostList(props) {
  if (props.posts) {
    return (
      <div className="d-flex flex-column w-100">
        <h3 className="mt-4">Posts</h3>
        <Grid container spacing={2}>
         { props.posts.length < 1 ? <Grid item> <h6>No posts available</h6> </Grid>: ''}
          {
            props.posts.map(post => (
              <Grid item className='d-flex' spacing={3} xs={12} sm={6} md={4}>
                <PostListItem
                  post={post}
                  user_logged={props.user_logged}
                  key={post.cuid}
                  onDelete={() => props.handleDeletePost(post.cuid)}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
  else{
    return null;
  }
  
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  user_logged: PropTypes.string.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
