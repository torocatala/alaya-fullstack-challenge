import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

function PostListItem({ post, user_logged, onDelete }) {
  let shrinkedContent = false;

  if (post) {

    const words = post.content.split(' ');

    if (words.length > 12) {
      shrinkedContent = words.slice(0, 12).join(' ')+ '...';
    }
  }

  return (
    <Card className="w-100 my-4">
      <CardContent>
        { post.image_url ? 
          <CardMedia component="img" className="mb-3" height="140px" image={ post.image_url } alt={post.title+" image"} /> : '' 
        }
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={`/posts/${post.cuid}/${post.slug}`} >
            {post.title}
          </Link>
        </Typography>
        <Typography component="p" className="mt-3">
          {shrinkedContent || post.content}
        </Typography>
        <Typography color="textSecondary" component="p" className="mt-3 font-italic">
          From {post.username}
        </Typography>
      </CardContent>
      <CardActions>
        { user_logged == post.username ? 
          <Button size="small" color="secondary" onClick={onDelete}> Delete post  </Button> : '' 
        }
      </CardActions>
    </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  user_logged: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
